import _ from "lodash";

import validate from '../validation/authValidate';
import generateHash from '../helpers/generateHash'
import AuthModel from "../database/models/authModel";

const AuthController = {
    async registerUser(req, res) {
        const user = _.pick(req.body, ["email", "username", "password", "contact", "position", "role", "level"])

        const { error } = await validate.validateInput(user);
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }

        const checkUserAvailable = await AuthModel.checkUser(user.email);

        if (checkUserAvailable.length) {
            return res.status(400).send({ status: 400, message: 'User already exists' })
        }

        user.password = await generateHash(user.password);
        console.log(user.password);

        const create = await AuthModel.registerUser(user);
        console.log(create)

        return res.status(201).send({
            status: 201,
            data: create,
            message: "User created successfully"
        });
    }
}


export default AuthController