import _ from "lodash";
import bcrypt from "bcrypt";

import validate from "../validation/authValidate";
import generateHash from "../helpers/generateHash";
import generateToken from "../helpers/generateToken";
import AuthModel from "../database/models/authModel";
import RolesModel from "../database/models/rolesModel";
import PermissionModal from "../database/models/permissionModel";

const AuthController = {
  async getAllUsers(req, res) {
    const getUsers = await AuthModel.fetchAllUsers();

    if (!getUsers.length) {
      return res.status(404).send({ status: 404, message: "No users yet" });
    }

    return res.status(200).send({ status: 200, data: getUsers });
  },
  async registerUser(req, res) {
    const user = _.pick(req.body, [
      "email",
      "username",
      "user_password",
      "contact",
      "user_role",
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

    const checkUserName = await AuthModel.checkUSerName(user.username);
    if (checkUserName.length) {
      return res
        .status(400)
        .send({ status: 400, message: "sorry your name is taken" });
    }

    const checkRole = await RolesModel.checkRole(user.user_role);
    if (!checkRole.length) {
      return res
        .status(400)
        .send({ status: 400, message: "Role your giving does not exist" });
    }

    user.user_password = await generateHash(user.user_password);

    const create = await AuthModel.registerUser(user);

    if (create.code)
      return res.status(500).send({
        status: 500,
        message: "something went wrong please contact the admin",
      });

    return res.status(201).send({
      status: 201,
      data: _.omit(create[0], ["user_password"]),
      message: "User created successfully",
    });
  },

  async logInCustomer(req, res) {
    const user = _.pick(req.body, ["email", "password"]);

    const { error } = await validate.validateLogin(user);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const checkUserExists = await AuthModel.checkUser(user.email);

    if (!checkUserExists.length) {
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
      role_id,
    } = checkUserExists[0];

    const permissions = await PermissionModal.getAllPermissionsOnASingleRoleName(
      role_id
    );

    const permit = [];

    for (const k of permissions) {
      permit.push(k.permission);
    }

    const validatePassword = await bcrypt.compare(user.password, password);

    if (!validatePassword) {
      return res
        .status(400)
        .send({ status: 400, message: "Please check your password" });
    }

    const token = await generateToken(user_id, email, username, role, permit);
    return res
      .status(200)
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({
        status: 200,
        data: _.omit(checkUserExists[0], ["password"]),
        token,
      });
  },

  async updatePassword(req, res) {
    const user = _.pick(req.body, ["email", "new_password"]);

    const { error } = await validate.validateChangePassword(user);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const checkUserAvailable = await AuthModel.checkUser(user.email);
    if (!checkUserAvailable.length) {
      return res.status(400).send({
        status: 400,
        message: "Please check your email or you may not have an account here",
      });
    }
    user.new_password = await generateHash(user.new_password);

    const { username, email, user_id, role } = checkUserAvailable[0];

    const token = await generateToken(user_id, email, username, role);

    const updatePassword = await AuthModel.updateUserPassword(
      user.new_password,
      user_id
    );

    if (updatePassword.code) {
      return res.status(500).send({
        status: 500,
        message: "something went wrong please contact admin",
      });
    }
    console.log(updatePassword);

    return res
      .status(200)
      .send({ status: 200, message: "Update done successfully" });
    // give the user the token in the header to be given the the body of the user.
  },
  async me(req, res) {
    const currentUSer = req.user;

    const { id } = currentUSer;

    const getCurrentUser = await AuthModel.fetchCurrentUser(id);
    if (!getCurrentUser.length) {
      return res
        .status(404)
        .send({ status: 404, message: "User not available" });
    }

    return res.status(200).send({
      status: 200,
      data: getCurrentUser[0],
      message: "User fetched successfully",
    });
  },
  async updateUSerDetails(req, res) {
    const user = _.pick(req.body, [
      "email",
      "username",
      "contact",
      "user_role",
    ]);
    const currentUSer = req.user;
    const { id } = currentUSer;
    // get the user details from the body
    const { error } = await validate.validateUSerUpdate(user);
    if (error) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }

    const checkUserName = await AuthModel.checkUSerName(user.username);

    if (checkUserName.length && checkUserName[0].user_id !== id) {
      return res
        .status(400)
        .send({ status: 400, message: "sorry your name is taken" });
    }
    // create a method in the update the user details except for the password
    const info = await AuthModel.updateUserDetails(user, id);
    console.log(info);
    return res
      .status(200)
      .send({ status: 200, message: "details updated successfully" });
  },
};

export default AuthController;
