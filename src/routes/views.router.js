const express = require("express");
const router = express.Router();
const ProductManager = require("../managers/product-manager.js");
const manager = new ProductManager("./src/data/productos.json");

router.get("/productos", async (req, res) => {
    const products = await manager.getProducts();

    res.render("home", {products});

})

module.exports = router;

