const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/db/product-mananger-db.js");
const manager = new ProductManager();
const { onlyAdmin } = require("../middleware/auth.js");
const passport = require("passport");


router.get("/realtimeproducts", passport.authenticate("current", {session: false}), onlyAdmin,  async (req, res) => {
     const products = await manager.getProducts();

     res.render("realTimeProducts", {products} );


})

module.exports = router;

