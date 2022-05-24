const { response } = require("express");
const express = require("express");
const fs = require('fs');
const { request } = require("http");
const Contenedor = require("./main.js");
let path = './products.txt'

const app = express ()

const PORT = process.env.PORT || 8080


app.get('/', (request, response) =>{
    response.send({msn: 'Server listening....'})
})


app.get('/productos', (request, response) =>{
    const productos = fs.readFileSync(path, "utf-8")
    const constructor = JSON.parse(productos)
    response.send([{
        items: constructor,
        cantidad: constructor.length
    }])
   
})

app.get('/productoRandom',(request, response)=>{
    const productos = fs.readFileSync(path,'utf-8')
    const constructor = JSON.parse (productos)
    response.send([{
        item: constructor[Math.floor(Math.random()* constructor.length)]
    }])
})

  

const server = app.listen(PORT,()=>{
    console.log(`Server http on ${PORT}...`)
})
server.on('error', error => console.log('Error on server', error))