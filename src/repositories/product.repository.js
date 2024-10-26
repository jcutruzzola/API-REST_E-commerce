const ProductDao = require("../dao/product.dao.js");

class ProductRepository {

    async createProduct(productData){
        return await ProductDao.save(productData);
    }

    async paginateProducts(query, options){
        return await ProductDao.paginate(query, options);
    }

    async getProducts(query){
        return await ProductDao.find(query);
    }

    async getProductById(id){
        return await ProductDao.findById(id);
    }

    async getProductsByCategory(category){
        return await ProductDao.findOne({ category });
    }

    async getProductByCode(code){
        return await ProductDao.findOne({ code });
    }

    async updateProduct(id, productData){
        return await ProductDao.update(id, productData);
    }

    async deleteProduct(id){
        return await ProductDao.delete(id);
    }
}

module.exports = new ProductRepository();