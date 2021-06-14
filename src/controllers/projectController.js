import _ from "lodash";

import validate from "../validation/projectValidation";
import ProjectModal from "../database/models/projectModal";

const ProjectControls = {
  async getAllProjects(req, res) {
    const getThem = await ProjectModal.getAllProjects();

    if (getThem.length === 0) {
      return res
        .status(404)
        .send({ status: 404, message: "No Projects yet", data: [] });
    }

    return res.status(200).send({ status: 200, data: getThem });
  },
  async createProject(req, res) {
    const project = _.pick(req.body, ["project_name"]);

    const { error } = await validate.validateInput(project);
    if (error) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }

    const checkProject = await ProjectModal.checkProject(project.project_name);
    if (checkProject.length) {
      return res
        .status(400)
        .send({ status: 400, message: "Project already exists" });
    }

    const createTask = await ProjectModal.createProject(project);

    return res.status(201).send({
      status: 201,
      data: createTask[0],
      message: "project created successfully",
    });
  },

  // create a function to a function to edit a a project name
  async updateProjectName(req, res) {
    const project_id = req.params.project_id;

    const project = _.pick(req.body, ["project_name"]);

    const { error } = await validate.validateInput(project);
    if (error) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }

    const checkProject = await ProjectModal.checkProjectWithId(project_id);
    if (!checkProject.length) {
      return res.status(400).send({
        status: 400,
        message: "Project you want to update does not exist",
      });
    }

    await ProjectModal.updateProject(project.project_name, project_id);

    return res
      .status(200)
      .send({ status: 200, message: "project updated successfully" });
  },
};

export default ProjectControls;
