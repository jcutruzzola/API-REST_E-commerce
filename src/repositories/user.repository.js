
const UserDao = require("../dao/user.dao.js");


class UserRepository {
    async createUser(userData) {
        return await UserDao.save(userData)
    }

    async getUserById(id){
        return await UserDao.findById(id);
    }

    async getUserByEmail(email){
        return await UserDao.findOne({email});
    }

    async getUserByQuery(query){
        return await UserDao.findOne(query);
    }

    async updateUsers(id, userData){
        return await UserDao.update(id, userData);
    }

    async deleteUsers(id){
        return await UserDao.delete(id);
    }
}

module.exports = new UserRepository();


