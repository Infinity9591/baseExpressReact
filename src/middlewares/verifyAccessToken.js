const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const whitelist = ['/', '/site/login'];

    if (whitelist.find((item) => '/v1/api' + item === req.originalUrl)) {
        //trong whitelist
        next();
    } else {
        try {
            if (req?.headers?.authorization?.split(' ')?.[1]) {
                const token = req?.headers?.authorization?.split(' ')[1];
                const verified = jwt.verify(token, process.env.JWT_SECRET);
                if (verified) {
                    if (!req.body) req.body = {};
                    req.body.user = verified;
                    next();
                }
            } else {
                return res.status(401).send('Unauthorized');
            }
        } catch (e) {
            console.log(e);
            return res.status(400).send('Bad Request');
        }
    }
};

module.exports = verifyToken;
