const cartService = require("../services/cart.service.js");
const productService = require("../services/product.service.js");
const userService = require("../services/user.service.js");
const TicketModel = require("../dao/models/ticket.model.js");
const cryptoRandomString = require("crypto-random-string");

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
            const cart = await cartService.getCartById(id);

            if(cart && cart.products.length > 0){
                cart = []; 

                return await cartService.updateCart(cartId, cart);
            }

            res.status(201).send("Productos eliminados del carrito").json(cart);

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

            const productDelete = cart.products.findIndex( i => i.product._id.equals(productId));
            if(!productDelete) return res.status(404).send("Producto no encontrado en el carrito");

            cart.products.splice(productDelete, 1);

            cart.markModified("products");

           
        } catch (error) {
            res.status(500).send("Error al eliminar producto del carrito", error);
            
        }

    }


    async finishPurchase(req, res){
        const cartId = req.params.cid;
        
        let total = 0;

        try {
            const cart = await cartService.getCartById(cartId);

            if(!cart) return res.status(404).send("Carrito no encontrado");

            const products = cart.products;
            const productsOutOfStock = [];

            for(const item of products){
                const productId = item.product;
                const product = await productService.getProductById(productId);
                if(product.stock >= item.quantity){
                    product.stock -= item.quantity;
                    await product.save();
                } else {
                    productsOutOfStock.push(productId);
                }
            }

            const userWcart = await userService.getUserByQuery({ cart: cartId });
            
            const ticket = new TicketModel({
                code: cryptoRandomString({length: 12}) || null,
                purchase_datetime,
                amount: total,
                purchaser: userWcart.email
            });

            await ticket.save();

            cart.products = cart.products.filter( item => productsOutOfStock.some(pid => pid.equals(item.product)));

            await cart.save();

            console.log(`cart products: ${cart.products}`);
            console.log(`No disponibles: ${productsOutOfStock}`);

            res.render("checkout", {user:`${userWcart.first_name, userWcart.last_name}`, email: userWcart.email, ticketNumber: ticket._id});

            
        } catch (error) {
            res.status(500).send("Error al procesar el pedido");
        }
    }

}


module.exports = CartController;
