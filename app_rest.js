const express = require('express');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const korisnici = require('./routes/users_rute');
const patike = require('./routes/shoes_rute');
const lopte = require('./routes/ball_rute');
const brand = require('./routes/brand_rute');
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));
app.use("/user", korisnici);
app.use("/ball", lopte);
app.use("/brand", brand);
app.use("/shoes", patike);


app.listen({ port: 9100 }, async () => {
    await sequelize.authenticate();
});