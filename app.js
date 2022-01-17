const express = require('express');
const { sequelize } = require('./models');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();


function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect('/admin/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect('/admin/login');
    
        req.user = user;
    
        next();
    });
}

function checkRole(req, res, next){ // proveravam da li admin pokusava da udje u users stranicu
    const cookies = getCookies(req);
    const token = cookies["token"]; // uzimamo token iz cookie-ja

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        // kad probamo da verifikujemo user-a ili dobijemo error ili user-a. Objekat user sadrzi ono sto smo definisali u app_auth.js kad smo regitrovali user-a i stavljali atribute u token.
        if(user.user != true){ // proveravam da li je ulogovani user admin
           
            return res.redirect(307, '/admin/index');
        }

        req.user = user;

        next();
    });
}

app.get('/admin/login', (req, res) => {
    res.sendFile('login.html', { root: './static/admin' });
});

app.get('/admin/index', authToken, (req, res) => {
   
    res.sendFile('index.html', { root: './static/admin' });
});


app.get('/admin/user', [authToken, checkRole], (req, res) => {
    
    res.sendFile('user.html', { root: './static/admin' });
});

app.get('/admin/brand', authToken, (req, res) => {
    
    res.sendFile('brand.html', { root: './static/admin' });
});

app.get('/admin/ball', authToken, (req, res) => {
    
    res.sendFile('ball.html', { root: './static/admin' });
});

app.get('/admin/shoes', authToken, (req, res) => {
    
    res.sendFile('shoes.html', { root: './static/admin' });
});

app.use(express.static(path.join(__dirname, 'static')));

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});