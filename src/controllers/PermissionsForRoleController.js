const dbConfig = require('../utils/db.config.js');
const { permissions_for_role, roles } =
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
                    ],
                })
                .then((rolePermission) => {
                    res.json(rolePermission);
                });
        } catch (e) {
            return res.status(500).send('error');
        }
    }

    async addPermissions(req, res) {
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
                const { role_id, permission_id, table_name } = permission;

                const exists = await RolePermissions.findOne({
                    where: { role_id, permission_id, table_name },
                });

                if (exists) {
                    results.push({
                        status: 'Exists',
                        role_id,
                        permission_id,
                        table_name,
                    });
                } else {
                    await RolePermissions.create({
                        role_id,
                        permission_id,
                        table_name,
                    });
                    results.push({
                        status: 'Success',
                        role_id,
                        permission_id,
                        table_name,
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
                const { role_id, permission_id, table_name } = permission;

                // Tìm đối tượng trong cơ sở dữ liệu
                const exists = await RolePermissions.findOne({
                    where: { role_id, permission_id, table_name },
                });

                if (exists) {
                    // Nếu tồn tại, tiến hành xóa
                    await RolePermissions.destroy({
                        where: { role_id, permission_id, table_name },
                    });
                    results.push({
                        status: 'Deleted',
                        role_id,
                        permission_id,
                        table_name,
                    });
                } else {
                    // Nếu không tồn tại, trả về trạng thái không tìm thấy
                    results.push({
                        status: 'Not Found',
                        role_id,
                        permission_id,
                        table_name,
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
