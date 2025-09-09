import React, { useState } from "react";
import plus_icon from "../../assets/plus-icon.svg";
import UserSearchBar from "./UserSearchBar";

const UserList = () => {
  const [userlist, setUserlist] = useState([
  
  ]);

  return (
    <div className="w-full bg-red-500 font-inter">
      <header className="flex w-full justify-between mt-12 ">
        <p>Membres</p>
        <button className="flex ">
          <img src={plus_icon} />
          Ajouter
        </button>
      </header>

      <UserSearchBar />

      <div>
        <p>Utilisateurs trouvés</p>
        <table className="w-full">
          <thead className="flex justify-between px-5">
            <th>Nom / Prenom</th>
            <th>Email</th>
            <th>Role</th>
            <th>Date de création</th>
            <th>Modifier</th>
          </thead>

          <tbody>
            {userlist?.map((user, index) => (
              <tr key={index} className="flex justify-between w-full px-5">
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
