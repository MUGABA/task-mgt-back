import _ from "lodash";
import PermissionModal from "../database/models/permissionModel";

const PermissionController = {
  async fetchAllPermissions(req, res) {
    const getPermissions = await PermissionModal.getAllPermissions();

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

    const checkRoleHasPermission = await PermissionModal.checkPermissionForRole(
      roleId,
      permission.permission_id
    );

    if (checkRoleHasPermission.length) {
      const givenPermission = checkRoleHasPermission[0];

      if (givePermission.status === "active")
        return res
          .status(400)
          .send({ status: 400, message: "Role already has this permission" });

      if (givePermission.status === "deactive") {
        await PermissionModal.reActivatePermissionOnARole(
          roleId,
          permission.permission_id
        );
        return res
          .status(200)
          .send({ status: 200, message: "Permission given successfully" });
      }
    }

    const givePermission = await PermissionModal.givePermission(
      roleId,
      permission.permission_id
    );

    return res.status(201).send({ message: "Permission given successfully " });
  },
  async fetchAllPermissionsOnARole(req, res) {
    const roleId = req.params.role_id;
    const getAllPermissions =
      await PermissionModal.getAllPermissionsOnASingleRole(roleId);
    if (!getAllPermissions.length) {
      return res
        .status(404)
        .send({ status: 404, message: "This Role has no permissions yet" });
    }

    return res.status(200).send({
      status: 200,
      data: getAllPermissions,
    });
  },
  async revokePermission(req, res) {
    const roleId = req.params.role_id;
    const permissionId = req.params.permission_id;

    await PermissionModal.revokePermission(roleId, permissionId);

    return res
      .status(200)
      .send({ status: 200, message: "Permission revoked successfully" });
  },

  async fetchPermissionsNotForROle(req, res) {
    const roleId = req.params.role_id;

    const getPermissions = await PermissionModal.getPermissionNotForRole(
      roleId
    );

    return res.status(200).send({ data: getPermissions, status: 200 });
  },
};

export default PermissionController;
