import _ from "lodash";
import Role from "../database/models/rolesModel";
import validate from "../validation/rolesValidation";

const RolesControllers = {
  async getAllRoles(req, res) {
    const getThem = await Role.fetchAll();
    return res.status(200).send({
      data: getThem,
    });
  },
  async createRoles(req, res) {
    const role = _.pick(req.body, "role");

    const { error } = await validate.validateInput(role);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const checkRoleExistence = await Role.checkRoleName(role.role);
    if (checkRoleExistence.length)
      return res.status(400).send({ message: "The role already exists" });

    const create = await Role.createRole(role);
    return res.status(201).send({
      status: 201,
      data: create,
      message: "Role created successfully",
    });
  },
};

export default RolesControllers;
