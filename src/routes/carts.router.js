const express = require ("express");
const router = express.Router();
const CartManager = require("../managers/cart-manager.js");
const cartManager = new CartManager("./src/data/carts.json")

// Post & add new cart

router.post("/", async (req, res) => {
    try {
        const newCart =  await cartManager.createNewCart();
        res.json(newCart);

    } catch(error){
        res.status(500).send("Error del servidor")

    }
    
})


// Listar products de un carrito

router.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);

    try {
        const cart = await cartManager.getCartById(cartId);
        res.json(cart.products);


    } catch (error){
        res.status(500).send("Error al obtener los productos del carrito por id")

    }

})

// agregar productos al carrito

router.post("/:cid/product/:pid", async (req, res) => {
    let cartId = parseInt(req.params.cid);
    let productId = parseInt(req.params.pid);
    let quantity = req.body.quantity || 1;

    try {
        const updatedCart = await cartManager.addProductsToCart(cartId, productId, quantity);
        res.json(updatedCart.products);

    } catch (error) {
        res.status(500).send("Error al agregar productos al carrito");

    }
})

//Faltan put y delete


module.exports = router;

