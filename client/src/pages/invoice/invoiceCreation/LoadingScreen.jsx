import loader from "../../../assets/loader.gif";
import Button from "../../../components/ui/Button.jsx";
import success_illustration from "../../../assets/success-illustration.svg";
const LoadingScreen = ({ loading = true }) => {
  return (
    <>
      <div className="absolute text-[#3F3F3F] bg-black bgAppearAnimation w-full min-h-full h-screen z-20 left-0 top-0 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white w-[700px] h-[600px] z-20 appearAnimation rounded px-5 py-5 flex flex-col justify-center items-center">
          {loading ? (
            <>
              <img className="size-24" src={loader} />
              <p className="text-2xl font-bold text-center">
                Validation de la commande
              </p>
              <p className="text-center">
                La validation de la commande est en cours
              </p>
            </>
          ) : (
            <>
              <img className="size-64" src={success_illustration} />
              <p className="text-2xl font-bold text-center mt-7">
                Votre commande est maintenant validée
              </p>
              <p className="text-center text-sm opacity-80 w-[90%]">
                Vous pouvez desormais consulter votre commande dans l'onglet
                commande, ou en cliquant sur le bouton ci-dessous. La commande
                peut maintenant être validée pour la création d'une facture !
              </p>
              <Button
                value={"Voir ma commande"}
                className={" w-[80%] mt-10"}
                onClickFunction={() => (window.location = "/order")}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
