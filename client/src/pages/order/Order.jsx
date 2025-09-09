import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import OrderItem from "./OrderItem";
import "./order.css";
import PdfViewer from "./PdfViewer";
import ChangeStatusButton from "./ChangeStatusButton";
import ActionButton from "./ActionButton";
import InvoiceButton from "../invoice/component/InvoiceButton";
import OrderValidationModal from "./OrderValidationModal";
import OrderDeleteModal from "./OrderDeleteModal";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [ordersToShow, setOrdersToShow] = useState([]);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [statusToShow, setStatusToShow] = useState("pending");
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidating, setIsValidating] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const fetchOrders = async () => {
    await axios
      .get(import.meta.env.VITE_API_HOST + "/api/order")
      .then((response) => {
        setOrders(response.data);
        filterOrders();
        setIsLoading(false);
      });
    setSelectedOrder([]);
  };

  const filterOrders = () => {
    if (statusToShow === "pending") {
      setOrdersToShow(
        orders.filter((order) => order.status.toLowerCase() === "pending")
      );
    } else if (statusToShow === "approved") {
      setOrdersToShow(
        orders.filter((order) => order.status.toLowerCase() === "validated")
      );
    } else if (statusToShow === "cancel") {
      setOrdersToShow(
        orders.filter((order) => order.status.toLowerCase() === "cancel")
      );
    }
  };

  useEffect(() => {
    filterOrders();
  }, [statusToShow, orders]);

  const handleSelect = (order) => {
    if (selectedOrder.includes(order)) {
      setSelectedOrder(selectedOrder.filter((orderId) => orderId !== order));
    } else {
      setSelectedOrder([...selectedOrder, order]);
    }
  };

  const fetchCommandPdf = async (id) => {
    await axios
      .get(import.meta.env.VITE_API_HOST + "/api/order/pdf/" + id, {
        responseType: "blob",
      })
      .then((response) => {
        setPdfBlob(response.data);
      });
  };

  const validateOrder = async () => {
    setIsValidating("pending");
    await axios
      .post(import.meta.env.VITE_API_HOST + "/api/order/validate", {
        orders: selectedOrder,
      })
      .then((response) => {
        fetchOrders();
        setIsValidating("finished");
      });
  };

  const cancelOrder = async () => {
    setIsCancelling("pending");
    await axios
      .post(import.meta.env.VITE_API_HOST + "/api/order/cancel", {
        orders: selectedOrder,
      })
      .then((response) => {
        fetchOrders();
        setOrders(orders.filter((order) => order.status !== "cancel"));
        setIsCancelling("finished");
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="text-[#3F3F3F]">
      {isValidating != false && <OrderValidationModal loading={isValidating} />}
      {isCancelling != false && <OrderDeleteModal loading={isCancelling} />}
      <p className="font-semibold text-lg mt-10">Bon de commandes crées</p>
      <p className=" opacity-80">
        Voici la liste de tous les bons des commandes crées (en cours et
        validés)
      </p>

      <div className="flex justify-between w-full items-center ">
        <ChangeStatusButton
          statusToShow={statusToShow}
          setStatusToShow={setStatusToShow}
        />
        <div className="flex gap-2 h-full ">
          <ActionButton
            selectedOrder={selectedOrder}
            validateOrder={validateOrder}
            cancelOrder={cancelOrder}
          />
          <InvoiceButton
            className={"!h-full text-sm"}
            value={"Créer une commande"}
            onClickFunction={() => (location.href = "/invoice/create")}
          />
        </div>
      </div>

      <div className="flex items-start mt-5 gap-3">
        <div className="bg-white min-h-fit w-[50%] rounded-lg px-6 py-6 flex flex-col gap-2">
          {ordersToShow.map((order, index) => (
            <OrderItem
              key={index}
              order={order}
              fetchCommandPdf={fetchCommandPdf}
              handleSelect={handleSelect}
              selectedOrder={selectedOrder}
            />
          ))}
        </div>

        {pdfBlob != null && (
          <PdfViewer className={"w-[50%] h-[70vh]"} blob={pdfBlob} />
        )}
      </div>
    </div>
  );
};

export default Order;
