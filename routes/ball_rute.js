const express = require('express');
const { sequelize, Ball } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const Joi = require('joi'); 

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const schema = Joi.object().keys({ 
    naziv: Joi.string().min(3).max(30).required(),
    cena: Joi.number().integer().required(),
    sport: Joi.string().min(3).max(30).required(),
    opis: Joi.string().min(3).max(30).required(),
    velicina: Joi.number().integer().required(),
    brandId: Joi.number().integer().required()    
  });

  const schema2 = Joi.object().keys({ 
    naziv: Joi.string().min(3).max(30).required(),
    cena: Joi.number().integer().required()   
  });

route.get('/getBall', (req, res) => {
    Ball.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/addBall', (req, res) => {
    const validate = schema.validate(req.body);

    console.log(validate);
 
    if(validate.error != null){
        console.log(validate.error.details[0].message);
        res.status(400).json(validate.error.details[0].message);
        return;
    }
    Ball.create(req.body).then( rows => {
      
        res.status(200).json(rows);

    }).catch( err => res.status(500).json(err) );
});

route.delete('/deleteBall', (req, res) => {
    
    Ball.destroy({ where: { id: req.body.id} })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});


route.put('/updateBall', (req, res) => {
    
    const data = {
        naziv:req.body.naziv,
        cena:req.body.cena
    };
   const validate = schema2.validate(data);

   console.log(validate);

   if(validate.error != null){
       console.log(validate.error.details[0].message);
       res.status(400).json(validate.error.details[0].message);
       return;
   }

    Ball.update(
        { 
            naziv:req.body.naziv,
            cena:req.body.cena,
            velicina:req.body.velicina,
            sport:req.body.sport,
            opis:req.body.opis,
        },
      
        {where: { id: req.body.id}} 
    )
        .then( rows => res.json("True") )
        .catch( err => res.status(500).json(err) );
});


module.exports = route;