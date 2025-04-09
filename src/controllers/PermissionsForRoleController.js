const dbConfig = require('../utils/db.config.js');
const { permissions_for_role, roles, permissions } =
    require('../models/init-models').default(dbConfig);
const bcrypt = require('bcrypt');

require('dotenv').config();

class PermissionsForRoleController {
    index(req, res) {
        try {
            permissions_for_role
                .findAll({
                    include: [
                        {
                            model: roles,
                            as: 'role',
                        },
                        {
                            model : permissions,
                            as : "permission"
                        }

                    ],
                })
                .then((permission_for_role) => {
                    res.status(200).json(permission_for_role);
                });
        } catch (e) {
            return res.status(500).send('error');
        }
    }

    async addPermissions(req, res) {
        try {
            const permissions = req.body;

            if (!Array.isArray(permissions)) {
                return res.status(400).json({
                    status: 'Error',
                    message: 'Input must be an array',
                });
            }

            const results = [];

            for (const permission of permissions) {
                const { id_role, id_permission, source_name } = permission;

                const exists = await permissions_for_role.findOne({
                    where: { id_role, id_permission, source_name },
                });

                if (exists) {
                    results.push({
                        status: 'Exists',
                        id_role,
                        id_permission,
                        source_name,
                    });
                } else {
                    await permissions_for_role.create({
                        id_role,
                        id_permission,
                        source_name,
                    });
                    results.push({
                        status: 'Success',
                        id_role,
                        id_permission,
                        source_name,
                    });
                }
            }

            res.status(200).json({ results });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'Error',
                message: 'Internal server error',
            });
        }
    }

    async deletePermissions(req, res) {
        try {
            const permissions = req.body; // Dữ liệu là một mảng JSON

            if (!Array.isArray(permissions)) {
                return res.status(400).json({
                    status: 'Error',
                    message: 'Input must be an array',
                });
            }

            const results = [];

            for (const permission of permissions) {
                const { id_role, id_permission, source_name } = permission;

                // Tìm đối tượng trong cơ sở dữ liệu
                const exists = await permissions_for_role.findOne({
                    where: { id_role, id_permission, source_name },
                });

                if (exists) {
                    // Nếu tồn tại, tiến hành xóa
                    await permissions_for_role.destroy({
                        where: { id_role, id_permission, source_name },
                    });
                    results.push({
                        status: 'Deleted',
                        id_role,
                        id_permission,
                        source_name,
                    });
                } else {
                    // Nếu không tồn tại, trả về trạng thái không tìm thấy
                    results.push({
                        status: 'Not Found',
                        id_role,
                        id_permission,
                        source_name,
                    });
                }
            }

            // Trả về kết quả
            res.status(200).json({ results });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'Error',
                message: 'Internal server error',
            });
        }
    }
}

module.exports = new PermissionsForRoleController();
