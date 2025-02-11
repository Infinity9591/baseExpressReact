const Accounts = require('../models/accounts');
const bcrypt = require('bcrypt');

require('dotenv').config();

class AccountController {
    index(req, res) {
        try {
            Accounts.findAll().then((accounts) => {
                res.json(accounts);
            });
        } catch (e) {
            return res.status(500).send('error');
        }
    }

    async create(req, res) {
        try {
            if (req.body.username === '' || req.body.password === '') {
                res.status(400).json({
                    message: 'Username or Password must not be null',
                });
            } else {
                const existsUsername = await Accounts.findOne({
                    where: { username: req.body.username },
                });
                if (existsUsername) {
                    res.status(500).json('Exists Username');
                } else {
                    bcrypt
                        .hash(
                            req.body.password,
                            parseInt(process.env.COST_FACTOR),
                        )
                        .then(function (hash) {
                            Accounts.create({
                                username: req.body.username,
                                password_hash: hash,
                                role_id: req?.body?.role_id,
                                is_active: 1,
                            }).then(() => {
                                res.status(200).json({
                                    statusCreate: 'Success',
                                });
                            });
                        });
                }
            }
        } catch (e) {
            return res.status(500).send('error');
        }
    }

    deactive(req, res) {
        try {
            Accounts.findOne({ where: { id: req.body.id } })
                .then((account) => {
                    if (account.is_active === 1)
                        account.update({
                            is_active: 0,
                        });
                })
                .then(() => {
                    res.status(200).json({ status: 'Success' });
                });
        } catch (e) {
            return res.status(500).send('error');
        }
    }

    active(req, res) {
        try {
            Accounts.findOne({ where: { id: req.body.id } })
                .then((account) => {
                    account.update({
                        is_active: 1,
                    });
                })
                .then(() => {
                    res.status(200).json({ status: 'Success' });
                });
        } catch (e) {
            return res.status(500).send('error');
        }
    }

    editRole(req, res) {
        try {
            Accounts.findOne({ where: { id: req.body.id } })
                .then((account) => {
                    account.update({
                        role_id: req.body.role_id,
                    });
                })
                .then(() => {
                    res.status(200).json({ status: 'Success' });
                });
        } catch (e) {
            return res.status(500).send('error');
        }
    }
}

module.exports = new AccountController();
