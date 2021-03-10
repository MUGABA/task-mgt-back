import _ from "lodash";




const Authcontral = {
    async registerUser(req, res) {
        const user = _.pick(req.body, ["email", "username", "password", "contact", "position", "role", "level"])

    }
}