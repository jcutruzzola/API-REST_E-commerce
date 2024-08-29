const express = require("express");
const ProductManager = require("../dao/db/product-mananger-db.js");
const manager = new ProductManager();
const router = express.Router();

//Listar todos los productos


router.get("/", async (req, res) => {
    

    try {

        const limit = parseInt(req.query.limit) || null;
        const page = parseInt(req.query.page) || null;
        const orderQuery = req.query.sort;

        const sortOrder = orderQuery === "asc" ? 1 : (orderQuery === "des" ? -1 : null);

        const productsArray = await manager.getProducts(limit, page, sortOrder);


        res.send({

            result: "succes",                //productsArray ?  "success" : "error",
            payload: productsArray.docs,
            totalPages: productsArray.totalPages,
            prevPage: productsArray.prevPage,
            nextPage: productsArray.nextPage,
            page: productsArray.page,
            hasPrevPage: productsArray.hasPrevPage,
            hasNextPage: productsArray.hasNextPage,
            prevLink: productsArray.prevLink = productsArray.hasPrevPage ? `http://localhost:8080/?page=${productsArray.prevPage}` : null,
            nextLink: productsArray.nextLink = productsArray.hasNextPage ? `http://localhost:8080/?page=${productsArray.nextPage}` : null,

        });

    } catch (error) {
        res.status(500).send("Error del servidor");  
    }
 
});



/* 
  try {

        const arrayProducts = await manager.getProducts();

        if (limit) {
            res.send(arrayProducts.slice(0, limit));
        } else {
            res.send(arrayProducts);
        }
    } catch (error) {
        res.status(500).send("Error del servidor");
    }


*/





//Buscar por id

router.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        const product = await manager.getProductById(id);

        if(!product) {
            res.send("Producto no encontrado");
        } else {
            res.send(product);
        }
    } catch (error) {
        res.send("Error al buscar ese id en los productos");
    }
})


//Agregar nuevo producto: 

router.post("/", async (req, res) => {
    const newProduct = req.body;
    
    try {
        await manager.addProduct(newProduct); 

        res.status(201).send("Producto agregado exitosamente"); 
    } catch (error) {

        res.status(500).json({status: "error", message: error.message});
    }
})

// Actualizar un producto

router.put("/:pid", async (req, res) => {
    let productId = req.params.pid;
    const product = req.body;

    try {
        await manager.updateProduct(productId, product);
        res.status(200).send("Producto actualizado correctamente");

    } catch (error) {
        
        res.status(500).json({ status: "error", message: "Error al actualizar" })
    }


})


// Eliminar un producto

router.delete("/:pid", async (req, res) => {
    let productId = req.params.pid;

    try {
        await manager.deleteProduct(productId);

        res.status(200).send(`Producto con el id ${productId} ha sido eliminado`);

    } catch (error) {
        
        res.status(500).send("No se pudo eliminar el producto")
    }

})

module.exports = router; 