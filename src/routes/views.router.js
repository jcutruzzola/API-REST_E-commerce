const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/db/product-mananger-db.js");
const ProductModel = require("../dao/models/product.model.js");
const CartModel = require("../dao/models/cart.model.js");
const manager = new ProductManager();


router.get("/productos", async (req, res) => {

    const products = await manager.getProducts();

    let page = req.query.page || 1;
    let limit = req.query.limit || 4;

    const listProducts = await ProductModel.paginate({}, {limit, page});

    const productsList = listProducts.docs.map( item => {
        const {_id, ...rest } = item.toObject();
        return rest;

    });


    res.render("home", {
        
        products: productsList,
        hasPrevPage: listProducts.hasPrevPage,
        hasNextPage: listProducts.hasNextPage,
        prevPage: listProducts.prevPage,
        nextPage: listProducts.nextPage,
        currentPage: listProducts.page,
        totalPages: listProducts.totalPages
    
    });

})


router.get("/carts/:cid", async (req, res) => {

    const cartId = req.params.cid
    const cart = await CartModel.findById(cartId);

    res.render("carts", { cart } );



})

module.exports = router;

