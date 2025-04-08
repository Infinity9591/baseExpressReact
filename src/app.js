require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routers');
const verifyToken = require('../src/middlewares/verifyAccessToken');

app.use(cors());

// app.use(
//     cors({
//         origin: "http://localhost:5173", // Frontend URL (React)
//         credentials: true, // Cho phép gửi cookie, token
//     })
// );

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.use(
    morgan(
        ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms :res[content-length] - ":user-agent"',
    ),
);

app.use('/', verifyToken);

app.use('/v1/api', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
