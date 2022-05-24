const fs = require('fs')

const productos = []

class Contenedor {
    constructor(nombre) {
        this.nombre =nombre
    }
    async read (){
        try {
            let content = await fs.promises.readFile(this.nombre, 'utf-8') 
            if (content) return console.log(content)
        } catch (err){
            console.error([])
        }
    }
    async save(producto){
        try{
            productos.push(producto)
            await fs.promises.writeFile(this.nombre, JSON.stringify(productos,null,'\t'))
        }catch(err){
            console.error('No es posible guardar el archivo: ' + err)
        }
    }
    async delete (){
        try{
            await fs.promises.unlink(this.nombre, (err) =>{
                if (err) return console.log ('Error al borrar archivo: ' + err)
            })
        }catch (err){
            console.error('Error al borrar archivo: ' + err)
        }
    }
} 

const archive = new Contenedor("products.txt")
archive.save({title:'Escuadra', price: 123.45, thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_618201-MLC31211115332_062019-O.webp', id: productos.length + 1})
archive.save({title:'Calculadora', price: 234.56, thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_933828-MLC47613838689_092021-O.webp', id: productos.length + 1})
archive.save({title:'Ps4', price: 345.67, thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_640840-MLA45733317866_042021-F.webp', id: productos.length + 1})
archive.read()