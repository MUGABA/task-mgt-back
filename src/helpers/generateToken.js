import jwt from "jsonwebtoken";
import config from "config";

const generateToken = (id, email, position, role) => {
  const token = jwt.sign(
    {
      id,
      email,
      position,
      role,
      level,
    },
    config.get("secretkey")
  );
  return token;
};

export default generateToken;
