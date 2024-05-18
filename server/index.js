const express = require('express')

const mongoose = require('mongoose')

const cors = require('cors')


const SignupModel = require('./models/signup')
const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/authentication");

//Method for register route....
app.post('/register',(req,res)=>{
    SignupModel.create(req.body)
    .then(result => res.json("Success"))
    .catch(err=>res.json(err))
})

//Method for login route....
app.post('/login',(req,res)=>{
    const {email,password} = req.body;
    SignupModel.findOne({email: email})
    .then(user =>{
        if(user){
            if(user.password === password){
                res.json("Success");
            }
            else{
                res.json("Invalid")
            }
        }
        else{
            res.json("No Record exists")
        }
        })
})



app.listen(3001,()=>{
    console.log('Server Running')
})