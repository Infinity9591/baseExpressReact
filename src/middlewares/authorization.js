const dbConfig = require('../utils/db.config.js');
const { accounts } = require('../models/init-models').default(dbConfig);
const defineAbilitiesFor = require('../utils/acl');

const authorization = (action, resource) => {
    return (req, res, next) => {
        try {
            accounts.findByPk(req.body.user.id).then(async (account) => {
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
