const PageLink = ({ link, icon, text, className }) => {
  return (
    <a
      className={
        className +
        " flex hover:bg-black hover:bg-opacity-5 opacity-70 hover:opacity-100 hover:scale-105 transition-all items-center rounded-md px-2 py-2 gap-4 text-white"
      }
      href={link}
    >
      <img className="size-7 opacity-80" src={icon} />
      <p className="text-lg font-normal opacity-80">{text}</p>
    </a>
  );
};

export default PageLink;
