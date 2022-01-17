const express = require('express');
const { sequelize, Brand } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const Joi = require('joi'); 

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const schema = Joi.object().keys({ 
    naziv: Joi.string().min(3).max(30).required(),
    zemlja: Joi.string().min(3).max(30).required(),
    godinaOsnivanja: Joi.string().min(3).max(30).required(),
    osnivac: Joi.string().min(3).max(30).required(),
  });


  const schema2 = Joi.object().keys({ 
    naziv: Joi.string().min(3).max(30).required(),
    zemlja: Joi.string().min(3).max(30).required()
  });

route.get('/getBrand', (req, res) => {
    Brand.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/addBrand', (req, res) => {

    Brand.create(req.body).then( rows => {
      
        res.status(200).json(rows);

    }).catch( err => res.status(500).json(err) );
});

route.delete('/deleteBrand', (req, res) => {
    
    Brand.destroy({ where: { id: req.body.id} })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});


route.put('/updateBrand', (req, res) => {
    
    const data = {
        naziv:req.body.naziv,
        zemlja:req.body.zemlja
    };
   const validate = schema2.validate(data);

   console.log(validate);

   if(validate.error != null){
       console.log(validate.error.details[0].message);
       res.status(400).json(validate.error.details[0].message);
       return;
   }
    Brand.update(
        { 
            naziv:req.body.naziv,
            zemlja:req.body.zemlja,
            osnivac:req.body.osnivac,
            godinaOsnivanja:req.body.godinaOsnivanja,
            
        },
      
        {where: { id: req.body.id}} 
    )
        .then( rows => res.json("True") )
        .catch( err => res.status(500).json(err) );
});


module.exports = route;