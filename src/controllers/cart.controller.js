const cartService = require("../services/cart.service.js");
const productService = require("../services/product.service.js");
const userService = require("../services/user.service.js");
const UserModel = require("../dao/models/user.model.js");
const TicketModel = require("../dao/models/ticket.model.js");
const { totalCalc, randomCode } = require("../utils/cartUtils.js");
// const cryptoRandomString = require("crypto-random-string");

// import cryptoRandomString from "crypto-random-string";

class CartController{

    async newCart(req, res){
        try {
            const newCart = await cartService.createCart();
            res.status(201).json(newCart);

        } catch (error) {
            res.status(500).send("Error al crear nuevo carrito ", error);
        }

    }

    async getCart(req, res){
        const id = req.params.cid;

        try {
            const cart = await cartService.getCartById(id);
            if(!cart) return res.status(404).send("El carrito no existe");

            res.json(cart);
        } catch (error) {
            res.status(500).send("Error al buscar el carrito ", error);
        }
    }

    async addProducts(req, res){
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity || 1;

        try {
            const cart = await cartService.getCartById(cartId);
            if(!cart) return res.status(404).send("El carrito no existe");

            const isProduct = cart.products.find(item => item.product.toString() === productId);
            if(isProduct){
                isProduct.quantity += quantity;
            } else{
                cart.products.push({product: productId, quantity });
            }

            await cartService.updateCart(cartId, cart);

            res.json(cart);

        } catch (error) {
            res.status(500).send("No se pudo agregar el producto al carrito");       
        }
    }

    async emptyCart(req, res){
        const cartId = req.params.cid;

        try {
           const cart = await cartService.getCartById(cartId);

            if(cart && cart.products.length > 0){
                cart.products = []; 
            //    return cart.save()

                return await cartService.updateCart(cartId, cart);
            }

            res.status(201).send("Productos eliminados del carrito");

        } catch (error) {

            res.status(500).send("Error al eliminar productos");
            
        }
    }

    async deleteProduct(req, res){

        const cartId = req.params.cid;
        const productId = req.params.pid;

        try {
            const cart = await cartService.getCartById(cartId);
            if(!cart) return res.status(404).send("Carrito no encontrado");

            console.log(cart);

            const productDelete = cart.products.findIndex( i => i.product._id.toString() === productId);
            if(productDelete === -1) return res.status(404).send("Producto no encontrado en el carrito");

            cart.products.splice(productDelete, 1);

            await cart.save();
            cart.markModified("products");

            res.status(200).send("Producto eliminado correctamente");

        } catch (error) {
            res.status(500).send("Error al eliminar producto del carrito");
            
        }

    }


    async finishPurchase(req, res){
        const cartId = req.params.cid;

        try {

            const cart = await cartService.getCartById(cartId);
            if(!cart) return res.status(404).send("Carrito no encontrado");

            const products = cart.products;

            const notAvailableProducts = [];

            for(const item of products){
                const productId = item.product;
                const product = await productService.getProductById(productId);

            
                if(product.stock >= item.quantity){
                    product.stock -= item.quantity;
                    await product.save();
                } else {
                    notAvailableProducts.push(productId);
                }
            }

            const userWcart = await userService.getUserByQuery({ cart: cartId });
            // const userWcart = await UserModel.findOne({cart: cartId});
        

            const ticket = new TicketModel({
                code: randomCode(10),
                purchase_datetime: new Date(),
                amount: totalCalc(cart.products),
                purchaser: userWcart._id
            });

            await ticket.save();

            cart.products = cart.products.filter( item => notAvailableProducts.some(pid => pid.equals(item.product)));

            await cart.save();

            res.json( {user: userWcart.first_name, email: userWcart.email, ticketNumber: ticket._id, date: ticket.purchase_datetime});

            
        } catch (error) {
            console.error("Error al procesar el pedido ", error);
            res.status(500).json({ error: "Error interno del servidor"});
        }
    }

}


module.exports = CartController;
