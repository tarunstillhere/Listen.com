const { name } = require("ejs");
const Joi = require("joi");

module.exports.callerSchema = Joi.object({
    caller : Joi.object({
        username : Joi.string().required().min(3).max(30),
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password : Joi.string().required(),
        phoneNumber : Joi.number().required(),
        gender : Joi.string().required(),
        dob : Joi.date().iso().required(),
        address : Joi.string().required(),
        imgURL : Joi.string().allow("", null),
        language : Joi.string().required(),
        status : Joi.string().required()
    }).required()
    
});

module.exports.receiverSchema = Joi.object({
    receiver : Joi.object({
        username : Joi.string().required().min(3).max(30),
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password : Joi.string().required(),
        phoneNumber : Joi.number().required(),
        gender : Joi.string().required(),
        dob : Joi.date().iso().required(),
        address : Joi.string().required(),
        imgURL : Joi.string().allow("", null),
        language : Joi.string().required(),
        status : Joi.string().required()
    }).required()
    
});