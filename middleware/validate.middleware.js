const Joi=require('joi')

const schema=Joi.object({
    name:Joi.string().required(),
    password:Joi.string().required(),
    email:Joi.string().email(),
    age:Joi.number().min(1).max(100),
    address:Joi.string()
})

const updateschema=Joi.object({
    name:Joi.string().required(),
    age:Joi.string().min(1).max(100),
    address:Joi.string()
})

const validate=(task)=>{
    return(req,res,next)=>{
        if(task === "create"){
            var {value,error}=schema.validate(req.body)
        }
        else if(task === "update"){
            var {value,error}=schema.validate(req.body)
        }
        if(error){
            console.log(error)
        }
        if(value){
            next()
        }
    }
}

module.exports=validate;