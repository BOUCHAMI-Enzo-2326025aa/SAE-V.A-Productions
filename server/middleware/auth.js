import jsonwebtoken from "jsonwebtoken";
import { Roles, isRoleValid } from "../utils/Roles.js";

export const authorize = (permission) => {
  return (req, res, next) => {
    try {
      if (permission === Roles.All) {
        next();
        return;
      }

      const token =
        req.headers["Authorization"] || req.headers["authorization"];

      if (!token) throw new Error("Token manquant"); // Token does not exist

      jsonwebtoken.verify(token, process.env.SECRET, (err, decodedToken) => {
        if (!isRoleValid(decodedToken.user.role, permission))
          throw new Error("Permission invalide");
      });
      next();
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  };
};
