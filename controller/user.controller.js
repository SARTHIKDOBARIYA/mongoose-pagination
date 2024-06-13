const UserModel=require('models/user.model.')
const bcrypt=require('bcrypt')
const {email, sweat, us} = require("yarn/lib/cli");

const createUser=async (req,res)=>{
    try{
        var user=UserModel.create(req.body)
        res.status(200).send(user)
    }catch (e){
        console.log("create usercontroller error: ",error)
    }
}

const login=async (req,res)=>{
    try{
        const {email,password}=req.body
        const user= await UserModel.findOne({email: email})

        if(!user){
            console.log("User not found")
            res.status(404).json({message:"User not found"})
        }

        const ispassword=await bcrypt.compare(password,user.password)
        if(!ispassword){
            console.log("Invalid Password! Please Enter Invalid Password")
            res.status(404).json({message:"Invalid password"})
        }

    }
    catch (error){
        console.log("login usercontroller error",error)
    }
}

const updateUser=async (req,res)=>{
    try{
        const {id}=req.params;
        const user=await UserModel.findByIdAndUpdate(id,req.body,{new:true})
        if(!user){
            console.log("User not found")
        }
        res.status(200).json(user)
    }
    catch (error){
        console.log("update usercontroller error:",error)
    }
}

const getalluser=async (req,res)=>{
    try{
        const {page,limit}=req.query;
        const option={
            page:page,
            limit:limit,
            select:('-password'),
            sort:('name')
        }
        const result=await UserModel.paginate({},option)
        console.log(result)
        return res.status(200).json(result)
    }
    catch (error){
        console.log(error)
    }
}

const getUser=async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await UserModel.findById(id)
        if(!user){
            console.log("User not found")
        }
        res.status(200).json(user)
    }
    catch(error){
        console.log("getuser controller error")
    }
}

const deleteUser=async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await UserModel.findByIdAndDelete(id)
        if(!user){
            console.log("User not found")
        }
        res.status(200).json(user)
    }
    catch (error){
        console.log("delete controller error",error)
    }
}

module.exports={
    createUser,
    login,
    updateUser,
    deleteUser,
    getUser,
    getalluser
}