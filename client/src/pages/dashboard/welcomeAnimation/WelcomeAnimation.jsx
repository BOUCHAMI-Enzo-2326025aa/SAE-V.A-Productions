import "./welcomeAnimation.css";

const WelcomeAnimation = () => {
  const alreadyConnected = localStorage.getItem("alreadyConnected");

  if (alreadyConnected === null) {
    localStorage.setItem("alreadyConnected", true);
  }

  return (
    <div className="bg-white absolute left-0 top-0 w-screen h-screen z-[99] flex justify-center items-center welcome-container">
      <p className="text-[#3F3F3F] text-5xl font-semibold opacity-80 z-20 dashboard-welcome-text">
        Bienvenue chez V.A Production
      </p>
      <span className="bg-sphere blur-2xl size-72 left-[75%] top-[15%] bg-[#ab22b8]"></span>
      <span className="bg-sphere blur-2xl size-96 left-[40%] top-[50%] bg-[#ab22b8] "></span>
      <span className="bg-sphere blur-2xl size-96 left-[50%] top-[50%] bg-[#f1dd22] "></span>
      <span className="bg-sphere blur-2xl size-96 left-[60%] top-[55%] bg-[#0c692b] "></span>
      <span className="bg-sphere blur-2xl size-32 left-[10%] top-[20%] bg-[#ab22b8]"></span>
    </div>
  );
};

export default WelcomeAnimation;
