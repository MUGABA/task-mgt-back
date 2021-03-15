import _ from "lodash";
import bcrypt from "bcrypt";

import validate from "../validation/authValidate";
import generateHash from "../helpers/generateHash";
import generateToken from "../helpers/generateToken";
import AuthModel from "../database/models/authModel";
import RolesModel from "../database/models/rolesModel";

const AuthController = {
  async registerUser(req, res) {
    const user = _.pick(req.body, [
      "email",
      "username",
      "password",
      "contact",
      "position",
      "role",
      "level",
    ]);

    const { error } = await validate.validateInput(user);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const checkUserAvailable = await AuthModel.checkUser(user.email);

    if (checkUserAvailable.length) {
      return res
        .status(400)
        .send({ status: 400, message: "User already exists" });
    }

    //check whether the role exists that the user is being given

    const checkRole = await RolesModel.checkRole(user.role);
    if (!checkRole.length) {
      return res
        .status(400)
        .send({ status: 400, message: "Role your giving does not exist" });
    }

    user.password = await generateHash(user.password);
    console.log(user.password);

    const create = await AuthModel.registerUser(user);

    return res.status(201).send({
      status: 201,
      data: _.omit(create[0], ["password"]),
      message: "User created successfully",
    });
  },
  async logInCustomer(req, res) {
    const user = _.pick(req.body, ["email", "password"]);

    const { error } = await validate.validateLogin(user);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const checkuserExists = await AuthModel.checkUser(user.email);
    if (!checkuserExists.length) {
      return res
        .status(400)
        .send({ status: 400, message: "Please check your email" });
    }

    const {
      username,
      password,
      email,
      user_id,
      role,
      level,
    } = checkuserExists[0];

    const validatePassword = await bcrypt.compare(user.password, password);

    if (!validatePassword) {
      return res
        .status(400)
        .send({ status: 400, message: "Please check your password" });
    }

    const token = await generateToken(user_id, email, username, role, level);

    return res
      .status(200)
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({
        status: 200,
        data: _.omit(checkuserExists[0], ["password"]),
        token,
      });

    //compare the password with the given password
    // generate the token to be given to the user...
    // return the user object and the token
  },
};

export default AuthController;
