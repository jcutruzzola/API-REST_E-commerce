const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/db/product-mananger-db.js");
const manager = new ProductManager();


router.get("/realtimeproducts" , async (req, res) => {
     const products = await manager.getProducts();

     res.render("realTimeProducts", {products} );


})

module.exports = router;

