const dbConfig = require('../utils/db.config.js');
const { roles } = require('../models/init-models').default(dbConfig);

class RoleController {
    index(req, res) {
        try {
            roles.findAll().then((role) => {
                res.json(role);
            });
        } catch (e) {
            return res.status(500).send('error');
        }
    }

    create(req, res) {
        try {
            Roles.create({ id: req.body.id, name: req.body.name });
            res.status(200).json({ statusCreate: 'Success' });
        } catch (e) {
            return res.status(500).send('error');
        }
    }

    update(req, res) {
        try {
            Roles.findByPk(req.body.id)
                .then((role) => {
                    role.update({
                        name: req.body.name,
                    });
                })
                .then(() => res.status(200).json({ statusUpdate: 'Success' }));
        } catch (e) {
            return res.status(500).send('error');
        }
    }
}

module.exports = new RoleController();
