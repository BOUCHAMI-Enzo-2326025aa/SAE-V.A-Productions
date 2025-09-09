export const Roles = {
  Commercial: ["commercial"],
  Admin: ["admin"],
  All: ["commercial", "admin"],
};

export const isRoleValid = (userRole, requiredRole) => {
  console.log("userrole :" + userRole);
  console.log("requiredRole :" + requiredRole);
  return !(requiredRole.indexOf(userRole) === -1);
};
