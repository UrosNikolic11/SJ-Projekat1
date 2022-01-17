const express = require('express');
const { sequelize, Shoes } = require('../models');
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
    broj: Joi.number().integer().required(),   
    tip: Joi.string().min(3).max(30).required(),
    opis: Joi.string().min(3).max(30).required(),
    brandId:Joi.number().integer().required(), 
  });

  const schema2 = Joi.object().keys({ 
    naziv: Joi.string().min(3).max(30).required(),
    cena: Joi.number().integer().required(),
  });

route.get('/getShoes', (req, res) => {
    Shoes.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/addShoes', (req, res) => {
    const validate = schema.validate(req.body);

    console.log(validate);
 
    if(validate.error != null){
        console.log(validate.error.details[0].message);
        res.status(400).json(validate.error.details[0].message);
        return;
    }
    Shoes.create(req.body).then( rows => {
      
        res.status(200).json(rows);

    }).catch( err => res.status(500).json(err) );
});

route.delete('/deleteShoes', (req, res) => {
    
    Shoes.destroy({ where: { id: req.body.id} })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});


route.put('/updateShoes', (req, res) => {
    
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

    
    Shoes.update(
        { 
            naziv:req.body.naziv,
            broj:req.body.broj,
            tip:req.body.tip,
            opis:req.body.opis,
            cena:req.body.cena,
            
        },
      
        {where: { id: req.body.id}} 
    )
        .then( rows => res.json("True") )
        .catch( err => res.status(500).json(err) );
});


module.exports = route;