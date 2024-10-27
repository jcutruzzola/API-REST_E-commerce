const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/db/product-mananger-db.js");
const ProductModel = require("../dao/models/product.model.js");
const CartModel = require("../dao/models/cart.model.js");
const { onlyAdmin, onlyUser } = require("../middleware/auth.js");
const passport = require("passport");
// const manager = new ProductManager();
const ProductService = require ("../services/product.service.js");


router.get("/products", passport.authenticate("current", {session: false}), onlyUser, async (req, res) => {

    let page = req.query.page || 1;
    let limit = req.query.limit || 4;

    const listProducts = await ProductService.paginateProducts({}, {page, limit});

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

    const cartId = req.params.cid;

    try {
        const cart = await CartModel.findById(cartId).populate("products.product").lean();

        // console.log(JSON.stringify(cart, null, 2));

        if (cart) {
            res.render("carts", { cart: cart });

        } else {
            console.log("No hay carrito");
            res.status(404).send("Carrito no encontrado");
        }
    } catch (error) {

        console.error("Error al buscar el carrito:", error);
        res.status(500).send("Error interno del servidor");
    }
});


router.get("/register", (req, res) => {
    res.render("register");

});

router.get("/login", (req, res) => {
    res.render("login");

});

module.exports = router;

