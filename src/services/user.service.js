
const userRepository = require("../repositories/user.repository.js");
const cartService = require("../services/cart.service.js");

const { createHash, isValidPassword } = require("../utils/bcrypt.js");


class UserService {

    async registerUser(userData) {
        const isUser = await userRepository.getUserByEmail(userData.email);
        if(isUser) throw new Error("El usuario ya existe");

        userData.password = createHash(userData.password);

        const newCart = await cartService.createCart();
        
        //Creo el carrito en el user
        userData.cart = newCart._id;

        return await userRepository.createUser(userData);

    }

    async loginUser(email, password){
        const user = await userRepository.getUserByEmail(email);
        if(!user || !isValidPassword(password, user)) throw new Error("Algun dato es erroneo");

        return user;

    }

    async getUserById(id) {
        return await userRepository.getUserById(id);
    }

    async getUserByQuery(query){
        return await userRepository.getUserByQuery(query);

    }

    async updateUser(id, userData){
        
    }

    async deleteUser(id){}
    

    

}

module.exports = new UserService();
 
