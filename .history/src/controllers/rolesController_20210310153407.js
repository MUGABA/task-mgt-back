import _ from "lodash";

import validate from "../validation/rolesValidation";
import Role from "../database/models/rolesModel";
import wrapRoute from "../middleware/asyncErrors";

const RolesControllers = {
    async getAllRoles(req, res) {
        const getThem = await Role.fetchAll();
        console.log(getThem)
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

        const checkRoleExistence = await Role.checkRole(role.role);
        // console.log(checkRoleExistence);
        if (checkRoleExistence.length)
            return res.status(400).send({ message: "The role already exists" });

        const create = await Role.createRole(role);
        console.log(create);
        return res.status(201).send({
            status: 201,
            data: create,
            message: "Role created successfully",
        });
    },
};

export default RolesControllers;