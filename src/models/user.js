const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const mongoosePagination=require('mongoose-paginate-v2')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
    },
    age:{
        type:Number,
        min:0,
        max:100,
        default:0
    }
})

userSchema.plugin(mongoosePagination)
userSchema.pre('save',function(req,res,next){
    try {
        let hashed_password = bcrypt.hash(this.password, 10)
        this.password = hashed_password
        next()
    }
    catch(err){
        console.log(err)
    }
})

userSchema.methods.generateAuthToken=async function(){
    try{
        const token=jwt.sign({_id:this._id},"secreat",{
            expiresIn:"20 hours"
        });
        return token
    }
    catch (err){
        console.log(err)
    }
}

const userModel=mongoose.model("user",userSchema)
module.exports=userModel
