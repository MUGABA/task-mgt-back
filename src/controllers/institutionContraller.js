import _ from "lodash";
import InstitutionModal from "../database/models/institutionModel";

import validation from "../validation/institutionValidation";

const InstitutionController = {
  async createAnInstitution(req, res) {
    const currentUser = req.user;
    const institution = _.pick(req.body, ["institution_name"]);

    const { error } = await validation.validateInput(institution);
    if (error) {
      return res
        .status(200)
        .send({ status: 400, message: error.details[0].message });
    }

    const checkInstitution = await InstitutionModal.checkInstitution(
      institution.institution_name
    );

    if (checkInstitution.length) {
      return res
        .status(400)
        .send({ status: 400, message: "Sorry institution name already taken" });
    }

    const data = {
      institution_name: institution.institution_name,
      creator: currentUser.id,
    };
    // send the data to the database

    const createInstitution = await InstitutionModal.registerInstitution(data);
    console.log(createInstitution);

    return res.status(201).send({
      status: 201,
      data: createInstitution[0],
      message: "Institution created successfully",
    });
  },
};

export default InstitutionController;
