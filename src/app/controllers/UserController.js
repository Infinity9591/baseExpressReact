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
}

module.exports = new UserController();
