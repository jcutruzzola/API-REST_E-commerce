const productRepository = require("../repositories/product.repository.js");


class ProductService {
    async createProduct(productData){
        return await productRepository.createProduct(productData);
    }

    async paginateProducts(query, options){
        return await productRepository.paginateProducts(query, options);
    }

    async getProducts(query){
        return await productRepository.getProducts(query);
    }

    async getProductById(id){
        return await productRepository.getProductById(id);
    }

    async updateProduct(id, productData){
        return await productRepository.updateProduct(id, productData);
    }
    
    async deleteProduct(id){
        return await productRepository.deleteProduct(id);
    }
}

module.exports = new ProductService();



/* 
async addProduct(productData) {

    const isProduct = await ProductRepository.getProductByCode(productData.code);
    if(isProduct) throw new Error("El código de éste producto ya existe");

    return await ProductRepository.createProduct(productData);
 
}

async getProducts(query, options){ 

    const options = {
        limit: options.limit,
        page: options.page,
        sortOrder: options.sortOrder,
    }

    return await ProductRepository.getProducts(query, { options });

}

async getProductById(id) {
    return await ProductRepository.getProductById(id);
}

async updateProductById(id, productData){
    return await ProductRepository.updateProduct(id, productData);

}

async deleteProductById(id){
    return await ProductRepository.deleteProduct(id);

} */