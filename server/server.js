const express = require('express');
const app = express();
const router = require('./route');

const PORT = process.env.PORT || 4000;
//const db = require('./config/db');

const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

sequelize.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', router);


app.listen(PORT, () => {
    console.log('Server On  : http://localhost:${PORT}/');
});