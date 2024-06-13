const express=require('express')
const bodyParser=require('body-parser')
const mongoose = require("mongoose");
const app=express()
const validate=require('middleware/validate.middleware')
const jwtstrategy=require("config/passport")
const passport=require('passport')
const auth=require('middleware/auth.middleware')
const {
    createUser,
    login,
    updateUser,
    deleteUser,
    getUser,
    getalluser
    }=require('controller/user.controller')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(passport.initialize)
passport.use("jwt",jwtstrategy)

main().then(()=>{
    console.log("Database connected Successfully")
})
    .catch(e=>{
        console.log(e)
    })

async function main(){
    await mongoose.connect(process.env.MONGO_URL)
}

app.get('user',validate("create"),createUser)

app.get('/login',login)

app.get('/users',auth(),getalluser)

app.get('/user/:id',auth(),getUser)

app.put('/user:id',validate("update"),auth(),updateUser)

app.delete('/user:id',auth(),deleteUser)
app.get('/',(req,res)=>{
    console.log("Working")
})

app.listen(process.env.port || 5000,()=>{
    console.log(`Server running at http://localhost:${port}`)
})

