const jwt = require('jsonwebtoken');
const { verify } = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const whitelist = ['/', '/site/login'];

    if (whitelist.find((item) => '/v1/api' + item === req.originalUrl)) {
        //trong whitelist
        next();
    } else {
        try {
            if (req?.headers?.authorization?.split(' ')?.[1]) {
                //nếu có kèm header token hợp pháp trong req
                const token = req?.headers?.authorization?.split(' ')[1];
                const verified = jwt.verify(token, process.env.JWT_SECRET);
                // console.log(verified);
                if (verified) {
                    req.body.user = verified;
                    next();
                }
            } else {
                //nếu không có token
                return res.status(401).send('Unauthorized');
            }
        } catch (e) {
            //nếu token hết hạn
            return res.status(400).send('Bad Request');
        }
    }
};

module.exports = verifyToken;
