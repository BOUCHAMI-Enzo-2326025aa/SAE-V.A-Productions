import { useState } from "react";
import axios from "axios";
import magazine_img from "../../assets/magazine-img.png";
import "./login.css";
import va_logo from "../../assets/va-production-logo.png";
import loading_gif from "../../assets/loading-gif.svg";
import ErrorMessage from "./ErrorMessage";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccessfull, setLoginSuccessfull] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    setErrorMessage();
    setLoading(true);

    axios
      .post(import.meta.env.VITE_API_HOST + "/api/user/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        setLoginSuccessfull(true);
        localStorage.setItem("user", JSON.stringify(response.data));
        location.replace("/dashboard");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex w-screen justify-center gap-[200px] min-h-screen mt-48 ">
      <div className="flex flex-col font-inter text-sm min-w-[400px]">
        {errorMessage && <ErrorMessage message={errorMessage} />}
        {loginSuccessfull && (
          <p className="bg-green-400 px-6 py-1 w-96">Connecté avec succès</p>
        )}

        {/* HEADER */}
        <div className="font-bold text-5xl">
          <p className="text-[#3F3F3F]">Bienvenue chez</p>
          <p className="text-white bg-[#3F3F3F] w-fit px-3 py-1">
            V.A Productions
          </p>
        </div>
        <p className="max-w-[450px] mt-5 opacity-70">
          Découvrez tous les outils liés à la prospection et facturation pour
          faciliter la prise de contact et de commande
        </p>

        {/* FORMULAIRE */}
        <form
          className="mt-6 flex flex-col gap-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="flex flex-col font-medium text-[15px]">
            Email
            <input
              required
              onChange={(e) => setUsername(e.target.value)}
              className="border-[#3F3F3F] border-[0.75px] border-opacity-15 max-w-[500px] py-[10px] rounded-[5px] px-2"
            ></input>
          </label>

          <label className="flex flex-col font-medium text-[15px]">
            Mot de passe
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="border-[#3F3F3F] border-[0.75px] border-opacity-15 max-w-[500px] py-[10px] rounded-[5px] px-2"
            ></input>
          </label>

          {/* BUTTONS */}
          <div className="flex flex-col w-full gap-2">
            <a className="text-right opacity-50 hover:opacity-100 transition-all cursor-pointer">
              Première connexion
            </a>
            <button
              className="bg-button w-full py-[14px] active:scale-95 rounded-[5px] text-white flex justify-center items-center"
              onClick={loginUser}
              type="submit"
            >
              {loading && <img className="size-6" src={loading_gif} />}
              {!loading && <p>Se connecter</p>}
            </button>
            <button
              className="w-full border-[#5C89E0] active:scale-95 text-[#5C89E0] hover:text-white hover:bg-[#5C89E0] transition-all border-2  py-3 rounded-[5px]"
              onClick={loginUser}
            >
              Mot de passe oublié?
            </button>
          </div>
        </form>
      </div>
      <img className="w-fit h-fit" src={magazine_img} />
      <img className="w-48 h-fit absolute left-12 top-12" src={va_logo} />
      <span className="triangle absolute -bottom-60 right-40 blur-md -rotate-45 opacity-70"></span>
      <span className="triangle absolute -top-32 -right-64 scale-75 blur-md rotate-[25deg] opacity-50"></span>
      <span className="w-96 h-96 bg-[#295CC046] -left-32 -bottom-52 absolute rounded-full blur-md rotate-[25deg] opacity-50"></span>
    </div>
  );
};

export default Login;
