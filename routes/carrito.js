const express= require('express');
const routerCarrito = express.Router();
const esAdmin = require('../middleware/checkAdmin');
const listado = require ('../persistencia/Carrito');
const listProd = require ('../persistencia/Archivo');


routerCarrito.get('/to-list/:id?',async (req,res)=>{
    try{
        if(!req.params.id){
            let content = await listado.read();
            if (content.length==0){
                throw new Error('There are not products uploaded')
            }
            res.json (content);
        }else{
            let content = await listado.search(req.params.id);
            if (content.length==0){
                throw new Error('Product not found');
            }
            res.json(content);
        }
        
    } catch(e){
        res.status(404).json ({"error": e.message});
    }
})

routerCarrito.post('/add/:id_product',esAdmin, async (req,res)=>{

    try{

        let prod = await listProd.search(req.params.id_producto);

        if (prod.length == 0){
            throw new Error('Product not found');
        }

        let d=new Date();

        let month = d.getMonth();

        month = month + 1;

        let date = d.getDate() + "/" + month + "/" + d.getFullYear() +" " + d.getHours()+":" + d.getMinutes() + ":" + d.getSeconds();      
    
        let productoGuardar={
            "timestamp":date,
            "producto":prod
        };

        let resultado = await listado.save(productoGuardar);
        if (resultado.length==0){
            throw new Error("Error saving file");
        }
        res.json(resultado);
    }catch(e){
        res.status(404).json({"error": e.message});
    }
})


 routerCarrito.delete('/delete/:id',esAdmin, async (req,res)=>{
    try{
        let deleted= await listado.deleteProduct(req.params.id);
        if (deleted == "There are no products on database" || deleted == "Element not found"){
            throw new Error(deleted)
        }
        if (deleted.length == 0){
            throw new Error("Error deleting product")
        }
        res.json(deleted);
    }catch(e){
        res.status(404).json({"error": e.message});
    }    
})


module.exports = routerCarrito;