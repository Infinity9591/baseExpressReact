const { AbilityBuilder, createMongoAbility } = require('@casl/ability');
const dbConfig = require('../utils/db.config.js');
const { permissions_for_role, permissions} = require('../models/init-models').default(dbConfig);
const Permissions = require('../models/permissions');

const defineAbilitiesFor = async (account) => {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    const permissionsForRoleInfors = await permissions_for_role.findAll({
        where: { id_role: account.id_role },
    });

    const results = await Promise.all(
        permissionsForRoleInfors.map(async (infor) => {
            const permission = await permissions.findOne({
                where: { id: infor.id_permission },
            });
            return {
                id: infor.id_role,
                permission: permission ? permission.action_name : null,
                source_name: infor.source_name,
            };
        }),
    );
    if (account.id_role === 1) {
        can('manage', 'all');
    } else {
        results.map((result) => {
            can(result.permission, result.source_name);
        });
    }

    return build();
};

module.exports = defineAbilitiesFor;
