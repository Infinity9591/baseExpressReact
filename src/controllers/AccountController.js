const dbConfig = require('../utils/db.config.js');
const { accounts } = require('../models/init-models').default(dbConfig);
const bcrypt = require('bcrypt');

require('dotenv').config();

class AccountController {
    index(req, res) {
        try {
            accounts.findAll().then((accounts) => {
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
                const existsUsername = await accounts.findOne({
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
                            accounts.create({
                                username: req.body.username,
                                password_hash: hash,
                                id_role: req?.body?.id_role,
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
            accounts.findOne({ where: { id: req.body.id } })
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
            accounts.findOne({ where: { id: req.body.id } })
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
            accounts.findOne({ where: { id: req.body.id } })
                .then((account) => {
                    account.update({
                        id_role: req.body.id_role,
                    });
                })
                .then(() => {
                    res.status(200).json({ status: 'Success' });
                });
        } catch (e) {
            return res.status(500).send('error');
        }
    }

    editInformation (req, res){
        try {
            accounts.findByPk(req.body.id)
                .then((account) => {
                    // res.status(200).json(account);
                    account.update(req.body)
                }).then (() => {
                    res.status(200).json({ status: 'Success' });
            })
        } catch (e) {
            return res.status(500).send('error');
        }
    }
}

module.exports = new AccountController();
