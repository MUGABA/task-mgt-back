import _ from "lodash";

import validate from '../validation/authValidate';
import generateHash from '../helpers/generateHash'
import AuthModel from "../database/models/authModel";

const Authcontral = {
    async registerUser(req, res) {
        const user = _.pick(req.body, ["email", "username", "password", "contact", "position", "role", "level"])

        const { error } = await validate.validateInput(user);
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }

        const checkUserAvailable = await AuthModel
    }
}


export default Authcontral