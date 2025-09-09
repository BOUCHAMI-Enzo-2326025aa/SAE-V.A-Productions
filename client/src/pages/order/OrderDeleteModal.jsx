import loader from "../../assets/loader.gif";
import Button from "../../components/ui/Button.jsx";
import success_illustration from "../../assets/cancel-success_illutration.svg";

const OrderDeleteModal = ({ loading = false }) => {
  return (
    <>
      <div className="absolute text-[#3F3F3F] bg-black bgAppearAnimation w-screen min-h-full h-screen z-[99] left-0 top-0 bg-opacity-50 flex  justify-center">
        <div className="bg-white w-[700px] h-[600px] z-20 right-[50%] -translate-x-[25%] appearAnimation rounded px-5 py-5 flex flex-col justify-center items-center mt-[50vh] -translate-y-[50%]">
          {loading == "pending" ? (
            <>
              <img className="size-24" src={loader} />
              <p className="text-2xl font-bold text-center">
                Annulation des factures
              </p>
              <p className="text-center">
                L'annulation des factures est en cours, cela peut prendre un
                moment ...
              </p>
            </>
          ) : (
            <>
              <img className="size-64" src={success_illustration} />
              <p className="text-2xl font-bold text-center mt-7">
                Facture annulée(s) avec succès
              </p>
              <p className="text-center text-sm opacity-80 w-[90%]">
                Vous pouvez desormais consulter vos factures dans l'onglet
                facture, ou en cliquant sur le bouton ci-dessous.
              </p>
              <Button
                value={"Voir mes factures"}
                className={" w-[80%] mt-10"}
                onClickFunction={() => (window.location = "/invoice")}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderDeleteModal;
