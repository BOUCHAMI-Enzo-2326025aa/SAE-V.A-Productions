import { useEffect, useState } from "react";
import ClientInformationsStep from "./clientInformationStep/ClientInformationsStep";
import InvoiceCreationStepFollow from "./invoiceCreationStepFollow/InvoiceCreationStepFollow";
import InvoiceSummary from "./invoiceSummary/InvoiceSummary";
import InvoiceSupportChoice from "./invoiceSupportChoice/InvoiceSupportChoice";
import ClientFacturationInfo from "./clientFacturationInfo/ClientFacturationInfo";
import InvoiceConfirm from "./invoiceConfirm/InvoiceConfirm";
import axios from "axios";
import "./invoice.css";
import LoadingScreen from "./LoadingScreen";

const InvoiceCreation = () => {
  const [step, setStep] = useState(1);
  const [contactList, setContactList] = useState([]);
  const [savedSupportList, setSavedSupportList] = useState([]);
  const [TVA_PERCENTAGE, setTVA_PERCENTAGE] = useState(0.2);
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState({
    client: {
      clientId: "",
      compagnyName: "",
      name: "",
      surname: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      postalCode: "",
      totalPrice: 0,
      support: [],
      signature: null,
    },
  });
  const fetchContact = async () => {
    await axios
      .get(import.meta.env.VITE_API_HOST + "/api/contact/")
      .then((response) => {
        setContactList(response.data.contactList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const deleteSupport = (index) => {
    const newSupportList = savedSupportList.filter((support, i) => i !== index);
    handleClientChange("support", newSupportList);
  };

  const handleClientChange = (field, value) => {
    setInvoice((prevState) => ({
      ...prevState,
      client: {
        ...prevState.client,
        [field]: value,
      },
    }));
  };

  const createNewSupport = (
    libelle,
    supportNumber,
    price,
    supportName,
    image
  ) => {
    const newSupport = {
      name: libelle,
      price: price,
      supportName: supportName,
      supportNumber: supportNumber,
      image: image,
    };

    setInvoice((prevState) => ({
      ...prevState,
      client: {
        ...prevState.client,
        support: [...prevState.client.support, newSupport],
      },
    }));
  };

  const createOrder = async () => {
    setLoading(true);
    increaseStep();
    for (let i = 0; i < savedSupportList.length; i++) {
      invoice.client.totalPrice += parseInt(savedSupportList[i].price);
    }

    const tva = { percentage: TVA_PERCENTAGE };

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_HOST + "/api/order/create",
        { invoice, tva },
        {
          responseType: "blob", // Indiquer que la réponse est un fichier (PDF)
        }
      );

      if (response.status === 200) {
        const contentDisposition = response.headers["content-disposition"];
        console.log("Content-Disposition:", response.headers); // Log pour vérifier
        let fileName = "facture.pdf";

        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
          if (fileNameMatch && fileNameMatch[1]) {
            fileName = fileNameMatch[1];
          }
        }

        console.log("Nom du fichier récupéré :", fileName);

        const blob = response.data;
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        setLoading(false);
      } else {
        console.error("Erreur lors de la création de la facture");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const increaseStep = () => setStep(step + 1);
  const decreaseStep = () => setStep(step - 1);

  return (
    <div className="flex gap-2 mt-8">
      {step == 5 && <LoadingScreen loading={loading} />}
      {step < 4 && (
        <div className="flex flex-col w-[50%] max-w-[450px] min-w-[450px] gap-2 overflow-hidden">
          <InvoiceCreationStepFollow step={step} />
          {step > 1 && <InvoiceSummary supportList={savedSupportList} />}
        </div>
      )}
      {step == 1 && (
        <ClientInformationsStep
          contactList={contactList}
          invoice={invoice}
          nextStepFunction={increaseStep}
          handleChange={handleClientChange}
          changeTVA={setTVA_PERCENTAGE}
        />
      )}
      {step == 2 && (
        <InvoiceSupportChoice
          nextPageFunction={increaseStep}
          previousPageFunction={decreaseStep}
          createNewSupport={createNewSupport}
          deleteSupport={deleteSupport}
          createdSupports={invoice.client.support}
        />
      )}
      {step == 3 && (
        <ClientFacturationInfo
          nextPageFunction={increaseStep}
          previousPageFunction={decreaseStep}
          handleChange={handleClientChange}
          invoice={invoice}
        />
      )}
      {step >= 4 && (
        <InvoiceConfirm
          invoice={invoice}
          supportList={invoice.client.support}
          createOrder={createOrder}
          handleChange={handleClientChange}
          returnFunction={decreaseStep}
          TVA_PERCENTAGE={TVA_PERCENTAGE}
        />
      )}
    </div>
  );
};

export default InvoiceCreation;
