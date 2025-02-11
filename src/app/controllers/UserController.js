const Users = require('../models/users');
const bcrypt = require('bcrypt');

require('dotenv').config();

class UserController {
    index(req, res) {
        try {
            Users.findAll().then((users) => {
                res.json(users);
            });
        } catch (e) {
            return res.status(500).send('error');
        }
    }

    create(req, res) {
        try {
            Users.create({
                name: req.body.name,
                phone_number: req.body.phone_number,
                email: req.body.email,
                address: req.body.address,
                account_id: req.body.account_id,
            }).then(() => {
                res.status(200).json({ statusCreate: 'Success' });
            });
        } catch (e) {
            return res.status(500).send('error');
        }
    }
}

module.exports = new UserController();
