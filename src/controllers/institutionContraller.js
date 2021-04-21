import _ from "lodash";
import InstitutionModal from "../database/models/institutionModel";

import validation from "../validation/institutionValidation";

const InstitutionController = {
  async createAnInstitution(req, res) {
    const currentUser = req.user;
    const institution = _.pick(req.body, [
      "institution_name",
      "inst_district",
      "inst_region",
      "inst_account",
      "inst_type",
      "inst_gender",
      "use_sasula",
      "sasula_code",
    ]);
    const { error } = await validation.validateInput(institution);
    console.log(error);
    if (error) {
      return res
        .status(200)
        .send({ status: 400, message: error.details[0].message });
    }

    const files = req.files;
    const { sasula_letter, document } = files;

    const sasulaUrl = sasula_letter[0].path;
    const documentUrl = document[0].path;

    const checkInstitution = await InstitutionModal.checkInstitution(
      institution.institution_name
    );
    if (checkInstitution.length) {
      return res
        .status(400)
        .send({ status: 400, message: "Sorry institution name already taken" });
    }

    const { id } = currentUser;
    const data = {
      ...institution,
      created_by: id,
      sasula_letter: sasulaUrl ? sasulaUrl : null,
      leader_document: documentUrl ? documentUrl : null,
    };

    const createInstitution = await InstitutionModal.registerInstitution(data);
    console.log(createInstitution);

    return res.status(201).send({
      status: 201,
      data: createInstitution[0],
      message: "Institution created successfully",
    });
  },

  async createAnInstitutionType(req, res) {
    const name = _.pick(req.body, ["type_name"]);

    const { error } = await validation.validateTypeCreation(name);
    if (error) {
      return res
        .status(200)
        .send({ status: 400, message: error.details[0].message });
    }

    const checkTypeName = await InstitutionModal.checkInstitutionType(
      name.type_name
    );

    if (checkTypeName.length) {
      return res
        .status(400)
        .send({ status: 400, message: "Institution type already created" });
    }

    const createInstitutionType = await InstitutionModal.registerInstitutionType(
      name
    );

    return res.status(201).send({
      status: 201,
      data: createInstitutionType[0],
      message: "Institution type created successfully",
    });
  },

  async getAllAvailableInstitutionType(req, res) {
    const getInstitutionTypes = await InstitutionModal.fetchAllInstitutionType();

    if (!getInstitutionTypes.length) {
      return res
        .status(404)
        .send({ status: 404, message: "No Institution types yet" });
    }

    return res.status(200).send({ status: 200, data: getInstitutionTypes });
  },
};

export default InstitutionController;
