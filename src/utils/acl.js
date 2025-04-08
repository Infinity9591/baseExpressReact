const { AbilityBuilder, createMongoAbility } = require('@casl/ability');
const PermissionsForRole = require('../models/permissions_for_role');
const Permissions = require('../models/permissions');

const defineAbilitiesFor = async (account) => {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    const permissionsForRoleInfors = await PermissionsForRole.findAll({
        where: { role_id: account.role_id },
    });

    const results = await Promise.all(
        permissionsForRoleInfors.map(async (infor) => {
            const permission = await Permissions.findOne({
                where: { id: infor.permission_id },
            });
            return {
                id: infor.id,
                role_id: infor.role_id,
                action_name: permission ? permission.action_name : null,
                table_name: infor.table_name,
            };
        }),
    );
    if (account.role_id === 'admin') {
        can('manage', 'all');
    } else {
        results.map((result) => {
            can(result.action_name, result.table_name);
        });
    }

    return build();
};

module.exports = defineAbilitiesFor;
