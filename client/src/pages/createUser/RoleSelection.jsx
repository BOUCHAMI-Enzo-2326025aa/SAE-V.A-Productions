const RoleSelection = ({ name }) => {
  return (
    <select className="bg-[#DBDEE1] font-semibold px-5 rounded py-2 role-selection">
      <option value="user">Commercial</option>
      <option value="admin">Admin</option>
    </select>
  );
};

export default RoleSelection;
