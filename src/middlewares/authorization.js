const Accounts = require('../models/accounts');
const defineAbilitiesFor = require('../utils/acl');
// const TableLogs = require('../app/models/tableLogs');

const authorization = (action, resource) => {
    return (req, res, next) => {
        try {
            Accounts.findByPk(req.body.user.id).then(async (account) => {
                const ability = await defineAbilitiesFor(account);

                if (!ability || typeof ability.can !== 'function') {
                    return res
                        .status(500)
                        .json({ message: 'Lỗi khởi tạo CASL' });
                }

                if (!ability.can(action, resource)) {
                    return res.status(403).json({ message: 'Không có quyền' });
                }
                next();
            });
        } catch (e) {}
    };
};

module.exports = authorization;
