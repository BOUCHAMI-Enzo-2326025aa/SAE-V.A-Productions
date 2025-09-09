import search_icon from "../../assets/search-icon.svg";

const UserSearchBar = () => {
  return (
    <>
      <p>Rechercher</p>
      <div className="w-full bg-white h-6 flex ">
        <img src={search_icon} />
        <input className=" text-[] w-full h-full"></input>;
      </div>
    </> 
  );
};

export default UserSearchBar;
