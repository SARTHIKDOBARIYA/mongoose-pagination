const Joi=require('joi')
const schema=Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    address:Joi.string(),
    age:Joi.number().min(1).max(100)
})

const UpdateSchema=Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required()
})

const validate=(task)=>{
    return(req,res,next)=>{
        if(task === "create") {
            var {value,error}= schema.validate(req.body)
        }
        else if(task==="update"){
            var {value,error}=UpdateSchema.validate(req.body)
        }
        if(error){
            res.status(200).json({error:error.details[0].message})
        }
        if(value){
            next();
        }
    }
}

module.exports=validate;