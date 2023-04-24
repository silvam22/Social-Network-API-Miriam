require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// DB connection 
mongoose.connect(process.env.MONGO_URI) 
.then(()=>{
    console.log('DB connected')
}).catch((err)=>{
console.log(err.message)
})
mongoose.set('debug', true)

app.use(routes)


const port = process.env.PORT || 3001
app.listen(port, ()=>{
    console.log('Sever running at port 3001')
})



