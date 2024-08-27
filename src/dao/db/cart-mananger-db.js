const CartModel = require("../models/cart.model.js");




class CartManager {


    async createNewCart() {
       try {

        const newCart = new CartModel({products: []});
        await newCart.save();

        return newCart;

       } catch (error) {
            console.log("Error al crear carrito");
            throw error;

       }

    }

    // Carrito by id

    async getCartById(cartId) {
        try {
          
            const cart = await CartModel.findById(cartId);

            if(!cart) {
                console.log("No existe el cart buscado");
                return null
            }
            return cart;

        } catch (error) {
            console.log("Error al obtener carrito por id");
            throw error;
        }
    }


    // Agregar productos al carrito

    async addProductsToCart(cartId, productId, quantity = 1) {
        
        try {
            const cart = await this.getCartById(cartId);

            const productExists = cart.products.find( item => item.product.toString() === productId);

            if (productExists){
                productExists.quantity += quantity;
            } else {
                cart.products.push({product: productId, quantity});
            }


            cart.markModified("products");

            await cart.save();
            return cart;

        } catch (error) {
            console.log("Error al agregar producto al carrito");
            throw error;
        }
    }
}


module.exports = CartManager;