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

            return cart.populate("products.product");

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


    // Borrar Carrito

    async deleteCart(cartId) {

        try {

            const cartDeleted = await CartModel.findByIdAndDelete(cartId);

             if(!cartDeleted) {
                 console.log("No se encuentra el carrito solicitado");
                return null;
             }

         console.log("Carrito Elminado Correctamente");


        } catch (error) {
            console.log("Error al eliminar carrito", error); 
        }
    }


    // Borrar productos del carrito

        async deleteProductsFromCart(cartId) {

            try {
                
                const cart = await CartModel.findById(cartId);

                 if(cart && cart.products.length > 0) {

                     cart.products = [];

                    cart.save();
                    return cart;

                 } else {

                    console.log("Debe agregar productos a su carrito");
                 }

            } catch (error) {
                console.log("Error al eliminar productos del carrito", error); 
            }

        }

    async updateProductQuantityByCart(cartId, updatedProductId, quantity) {

        try {

            const cart = await this.getCartById(cartId);
            const productFound = cart.products.findIndex( i => i.product.equals(updatedProductId) );
            

            if(productFound !== -1) {

                cart.products[productFound].quantity = quantity;

                cart.markModified("products");
                await cart.save();
                return cart;

            } else {
                console.log("El producto no se encuentra en este carrito");

                throw new Error("Producto no encontrado en el carrito");
            }

           

        } catch (error) {
            console.log("Error al actualizar producto", error);
            throw error;
 
        }
    }



    async deleteProductByIdFromCart(cartId, productId) {

        try {
            
            const cart = await this.getCartById(cartId);
            if(!cart) {
                console.log("Carrito no disponible");
                return null;
            }

            const productToDelete = cart.products.findIndex(i => i.product._id.equals(productId));

            if(productToDelete === -1) {
                console.log("Producto no encontrado en el carrito indicado");
                return null;
            }

            cart.products.splice(productToDelete, 1);

            cart.markModified("products");

            await cart.save();
            return cart;


        } catch (error) {
            console.error("Error al eliminar el producto del carrito:", error);
            throw error;   
        }
    }
}


module.exports = CartManager;