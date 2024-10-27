const ProductRepository = require("../repositories/product.repository.js");


class ProductService {
    async createProduct(productData){
        return await ProductRepository.createProduct(productData);
    }

    async paginateProducts(query, options){
        const productsArray = await ProductRepository.paginateProducts(query, options);
        return productsArray;
    }

    async getProducts(query){
        return await ProductRepository.getProducts(query);
    }

    async getProductById(id){
        return await ProductRepository.getProductById(id);
    }

    async updateProduct(id, productData){
        return await ProductRepository.updateProduct(id, productData);
    }
    
    async deleteProduct(id){
        return await ProductRepository.deleteProduct(id);
    }
}

module.exports = new ProductService();