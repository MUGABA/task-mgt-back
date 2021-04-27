import _ from "lodash";
import PermissionModal from "../database/models/permissionModel";

const PermissionController = {
  async fetchAllPermissions(req, res) {
    const getPermissions = await PermissionModal.getAllPermissions();
    console.log(getPermissions);
    if (!getPermissions.length) {
      return res.status(404).send({ message: "No Permissions yet", data: [] });
    }

    return res.status(200).send({ data: getPermissions });
  },

  async givePermission(req, res) {
    const roleId = req.params.role_id;
    const permission = _.pick(req.body, ["permission_id"]);

    if (!permission.permission_id) {
      return res
        .status(400)
        .send({ status: 400, message: "Permission must be provided" });
    }
    // check whether the role already has that permission
    const checkRoleHasPermission = await PermissionModal.checkPermissionForRole(
      roleId,
      permission.permission_id
    );

    if (checkRoleHasPermission.length) {
      return res
        .status(400)
        .send({ status: 400, message: "Role already has this permission" });
    }

    const givePermission = await PermissionModal.givePermission(
      roleId,
      permission.permission_id
    );
    console.log(givePermission);
    return res.status(201).send({ message: "Permission given successfully " });
  },
};

export default PermissionController;
