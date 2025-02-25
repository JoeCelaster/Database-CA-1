const express = require("express")
const mongoose = require("mongoose")
const app = express()

require("dotenv").config()

const resp = []
const menuitem = []
//Connection

mongoose.connect(process.env.MONGO_URI)
.then(console.log("MongoDB Connected"))
.catch(console.log("Connection Failed"))

//Mongoose 

const Resta = new mongoose.Schema({
    Name: {type: String,required: true},
    Location: {type: String,required: true},
    Menu_Items: {type: [String],required:true}
})
const Menu = new mongoose.Schema({
    Dish_name: {type: String,required: true},
    Cost: {type: String,required: true}
})


const resta = mongoose.model('resta',Resta)
const menu = mongoose.model('menu',Menu)
module.exports = resta

app.get('/',async (req,res) => {
    res.send("hello World")
})

app.post('/restaurant',async (req,res) => {
    try{
        const newData = new resta(req.body)
        resp.push(newData)
        res.status(201).send(resp)
    }
    catch{
        res.status(400).send("Please provide valid details!")
    }
})

app.post('/menu',async (req,res) => {
    try{
        const newData = new menu(req.body)
        menuitem.push(newData)
        res.status(201).send(menuitem)
    }
    catch{
        res.status(400).send("Please provide valid details!")
    }
})

app.listen(process.env.PORT,()=>{
    console.log("server is running")
})