const {callerSchema} = require("./schemaValidation");
// const {receiverSchema} = require("./schemaValidation");


const validateCaller = (req,res,next) => {
    let {error} = callerSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        // throw new ExpressError(400, errMsg);
        console.log(errMsg);
    }else {
        next();
    }
};


// const receiverCaller = (req,res,next) => {
//     let {error} = receiverSchema.validate(req.body);
//     if(error) {
//         let errMsg = error.details.map((el) => el.message).join(",");
//         // throw new ExpressError(400, errMsg);
//         console.log(errMsg);
//     }else {
//         next();
//     }
// };


module.exports = validateCaller;
// module.exports = receiverCaller;