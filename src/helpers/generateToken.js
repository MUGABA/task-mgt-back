import jwt from "jsonwebtoken";
import config from "config";

const generateToken = (id, email, username, role, level) => {
  const token = jwt.sign(
    {
      id,
      email,
      username,
      role,
      level,
    },
    config.get("secretkey")
  );
  return token;
};

export default generateToken;
