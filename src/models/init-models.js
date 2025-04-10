var DataTypes = require('sequelize').DataTypes;
var _accounts = require('./accounts');
var _permissions = require('./permissions');
var _permissions_for_role = require('./permissions_for_role');
var _roles = require('./roles');

function initModels(sequelize) {
    //define models
    var accounts = _accounts(sequelize, DataTypes);
    var permissions = _permissions(sequelize, DataTypes);
    var permissions_for_role = _permissions_for_role(sequelize, DataTypes);
    var roles = _roles(sequelize, DataTypes);

    //define association
    accounts.belongsTo(roles, { as : "role", foreignKey : "id_role"});
    permissions_for_role.belongsTo(roles, {as : "role", foreignKey : "id_role"});
    permissions_for_role.belongsTo(permissions, {as : "permission", foreignKey : "id_permission"});

    return {
        accounts,
        permissions,
        permissions_for_role,
        roles,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
