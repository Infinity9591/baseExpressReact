const Permissions = require('../models/permissions');

class PermissionController {
    index(req, res) {
        try {
            Permissions.findAll().then((permission) => {
                res.json(permission);
            });
        } catch (e) {
            return res.status(500).send('error');
        }
    }

    create(req, res) {
        try {
            Permissions.create({
                id: req.body.id,
                action_name: req.body.action_name,
            });
            res.status(200).json({ statusCreate: 'Success' });
        } catch (e) {
            return res.status(500).send('error');
        }
    }

    update(req, res) {
        try {
            Permissions.findByPk(req.body.id)
                .then((permission) => {
                    permission.update({
                        id: req.body.id,
                        action_name: req.body.action_name,
                    });
                })
                .then(() => res.status(200).json({ statusUpdate: 'Success' }));
        } catch (e) {
            return res.status(500).send('error');
        }
    }
}

module.exports = new PermissionController();
