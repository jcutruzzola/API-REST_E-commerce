const express = require ("express");
const router = express.Router();
const CartManager = require("../dao/db/cart-mananger-db.js");
const cartManager = new CartManager();



// Crear un nuevo carrito

router.post("/", async (req, res) => {

    try {
        const newCart =  await cartManager.createNewCart();
        res.json(newCart);

    } catch(error){
        res.status(500).send("Error del servidor")

    }
    
})


// Listar products de un carrito por id

router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {

        const cart = await cartManager.getCartById(cartId);

        res.json(cart.products);


    } catch (error){
        res.status(500).send("Error al obtener los productos del carrito por id")
    }
})

// agregar productos al carrito

router.post("/:cid/product/:pid", async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid; // ver
    let quantity = req.body.quantity || 1;

    try {
        const updatedCart = await cartManager.addProductsToCart(cartId, productId, quantity);
        res.json(updatedCart.products);

    } catch (error) {
        res.status(500).send("Error al agregar productos al carrito");

    }
})


/* 

// Borrar un carrito

router.delete("/:cid", async (req,res) => {

    const cartId= req.params.cid;

    try {
        
        await cartManager.deleteCart(cartId);

        res.status(200).send(`Carrito con el id ${cartId} ha sido eliminado`)

    } catch (error) {
        
        res.status(500).send("No se pudo eliminar el carrito");
    }
});


 */


// Borrar todos los productos del carrito

router.delete("/:cid", async (req, res) => {

    const cartId = req.params.cid;

    try {
        
        await cartManager.deleteProductsFromCart(cartId);

         res.status(200).send(`Todos los productos del carrito con el id ${cartId} han sido eliminados`);
        

    } catch (error) {

        res.status(500).send("No se pudo eliminar los productos del carrito");

    }


})


// Borrar producto por ID en un carrito

router.delete("/:cid/products/:pid", async (req, res) => {

    const cartId = req.params.cid;
    const productId = req.params.pid;

    try {

        await cartManager.deleteProductByIdFromCart(cartId, productId);

        res.status(400).send(`Producto con el id ${productId}, eliminado correctamente del carrito id: ${cartId}`);
        

    } catch (error) {

        res.status(500).send("No se pudo eliminar el producto del carrito seleccionado");

    }

})

// Actualizar cantidad de productos dentro del carrito


router.put("/:cid/products/:pid", async (req, res) => {

    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;

    try {

        if (typeof quantity !== "number" || quantity <= 0) {
            return res.status(400).send("Cantidad no valida");
        }
        
        await cartManager.updateProductQuantityByCart(cartId, productId, quantity);

        res.status(200).send("Cantidad actualizada correctamente");
       
        

    } catch (error) {

        res.status(500).send("No se pudo actualizar el producto", error)
        
    }

});


module.exports = router;
