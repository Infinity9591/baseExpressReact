const dbConfig = require('../utils/db.config.js');
const { accounts, roles } = require('../models/init-models').default(dbConfig);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

class SiteController {
    async login(req, res) {
        try {
            accounts
                .findOne({ where: { username: req.body.username } })
                .then(async (account) => {
                    if (!account)
                        return res.status(401).json({
                            message:
                                'Username or Password is not correct (Username)',
                        });
                    else if (account.is_active === 0)
                        return res
                            .status(403)
                            .json({ message: 'Account is inactive.' });
                    else {
                        if (
                            await bcrypt.compare(
                                req.body.password,
                                account.password_hash,
                            )
                        ) {
                            const payload = {
                                id: account.id,
                                username: account.username,
                            };
                            const token = jwt.sign(
                                payload,
                                process.env.JWT_SECRET,
                                { expiresIn: '1d' },
                            );

                            return res.status(200).send({
                                message: 'Success',
                                token,
                                user: {
                                    id: account.id,
                                    username: account.username,
                                },
                            });
                        } else
                            return res
                                .status(401)
                                .send(
                                    'username or Password is not correct (Password)',
                                );
                    }
                });
        } catch (e) {
            console.log(e);
            res.status(500).json('error');
        }
    }
    getPersonalInformation(req, res) {
        try {
            // res.json(req);
            accounts.findByPk(req.body.user.id, {
                include : {
                    // as : "roles",
                    model : roles
                }
            }).then((account) => {
                res.status(200).json(account);
            });
        } catch (e) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    updatePersonalInformation(req, res) {
        try {
            accounts.findByPk(req.body.user.id).then((account) => {
                Users.findOne({ where: { account_id: account.id } })
                    .then((user) => {
                        user.update({
                            name: req.body.name,
                            phone_number: req.body.phone_number,
                            email: req.body.email,
                            address: req.body.address,
                        });
                    })
                    .then(() => res.status(200).json({ message: 'Success' }));
            });
        } catch (e) {
            return res.status(500).send('error');
        }
    }

    changePassword(req, res) {
        try {
            accounts.findByPk(req.body.user.id).then(async (account) => {
                const new_password = await bcrypt.hash(
                    req.body.new_password,
                    parseInt(process.env.COST_FACTOR),
                );
                if (
                    await bcrypt.compare(
                        req.body.old_password,
                        account.password_hash,
                    )
                ) {
                    account
                        .update({
                            password_hash: new_password,
                        })
                        .then(() => {
                            res.status(200).json({ statusCreate: 'Success' });
                        });
                } else {
                    res.status(400).json({ message: 'Incorrect password' });
                }
            });
        } catch (e) {
            return res.status(500).send('error');
        }
    }

    async getSourceName(req, res) {
        const filters = ["sequelizemeta"];
        const database_table_names = await dbConfig
            .getQueryInterface()
            .showAllTables();
        const table_names = database_table_names
            .filter((name) => !filters.includes(name))
            .map((name) => ({ table_name: name }));
        res.status(200).json(table_names);
    }
}

module.exports = new SiteController();
