import jwt from "jsonwebtoken";
import config from "config";

const generateToken = (id, email, username, role, permissions) => {
  const token = jwt.sign(
    {
      id,
      email,
      username,
      role,
      permissions,
    },
    config.get("secretkey")
  );
  return token;
};

export default generateToken;
