const CartRepository = require("../repositories/cart.repository.js");

class CartService{
    async createCart(){
        return await CartRepository.createCart();
    }

    async getCartById(id){
        return await CartRepository.getCartById(id);
    }

    async updateCart(id, cartData){
        return await CartRepository.updateCart(id, cartData);
    }

    async deleteCart(id){
        return await CartRepository.deleteCart(id);
    }
}

module.exports = new CartService();