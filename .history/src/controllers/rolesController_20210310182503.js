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

        // check where the role exists 
        // check whether the ranks exist
        // check whether the available user is  a lead to create another user
        // user is not generated token right away right away...
        // user should have logged in to create that user 
        // user should be able to change their their password upon being their details.
        // create the endpoint to help the user to change their password...



        // First create the points to check the existence of the rank and role to the user


        const checkRoleExistence = await Role.checkRole(role.role);
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