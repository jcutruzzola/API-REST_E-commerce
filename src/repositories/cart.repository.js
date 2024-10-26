const CartDao = require("../dao/cart.dao.js");

class CartRepository{

    async createCart(){
        return await CartDao.save({products: []});
    }

    async getCartById(id){
        return await CartDao.findById(id);
    }

    async updateCart(id, cartData){
        return await CartDao.update(id, cartData);
    }

    async deleteCart(id){
        return await CartDao.delete(id);
    }
}


module.exports = new CartRepository();

