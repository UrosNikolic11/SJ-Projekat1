const express = require('express');
const { sequelize, Users } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const Joi = require('joi'); 

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const schema = Joi.object().keys({ 
    ime: Joi.string().min(3).max(30).required(),
    prezime: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    username: Joi.string().min(3).max(30).required(),
  });

route.get('/getUser', (req, res) => {
    Users.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/addUser', (req, res) => {

    console.log("ruta user");
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    if(req.body.admin == "admin"){
        req.body.admin = 1;
    }
    else req.body.admin = 0;
    Users.create(req.body).then( rows => {
      
        res.status(200).json(rows);

    }).catch( err => res.status(500).json(err) );
});

route.delete('/deleteUser', (req, res) => {
    
    Users.destroy({ where: { id: req.body.id} })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});


route.put('/updateUser', (req, res) => {
    
    const data = {
        ime:req.body.ime,
        prezime:req.body.prezime,
        email:req.body.email,
        username:req.body.username,
    };
    
   const validate = schema.validate(data);

   if(validate.error != null){
       console.log(validate.error.details[0].message);
       res.status(400).json(validate.error.details[0].message);
       return;
   }

    Users.update(
        { 
            ime:req.body.ime,
            prezime:req.body.prezime,
            email:req.body.email,
            username:req.body.username,
            
        },
      
        {where: { id: req.body.id}} 
    )
        .then( rows => res.json("True") )
        .catch( err => res.status(500).json(err) );
});


module.exports = route;