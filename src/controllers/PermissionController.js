const dbConfig = require('../utils/db.config.js');
const { permissions } = require('../models/init-models').default(dbConfig);

class PermissionController {
    index(req, res) {
        try {
            permissions.findAll().then((permission) => {
                res.json(permission);
            });
        } catch (e) {
            return res.status(500).send('error');
        }
    }

    create(req, res) {
        try {
            permissions.create({
                id: req.body.id,
                permission_name: req.body.permission_name,
            });
            res.status(200).json({ statusCreate: 'Success' });
        } catch (e) {
            return res.status(500).send('error');
        }
    }

    update(req, res) {
        try {
            permissions.findByPk(req.body.id)
                .then((permission) => {
                    permission.update({
                        id: req.body.id,
                        permission_name: req.body.permission_name,
                    });
                })
                .then(() => res.status(200).json({ statusUpdate: 'Success' }));
        } catch (e) {
            return res.status(500).send('error');
        }
    }
}

module.exports = new PermissionController();
