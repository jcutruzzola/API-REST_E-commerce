

const ProductModel = require("../dao/models/product.model.js");


class ProductDao {
    
    async find(query){
        return await ProductModel.find(query);
    }

    async findOne(query){
        return await ProductModel.findOne(query);
    }

    async findById(id){
        return await ProductModel.findById(id);
    }

    async paginate(query, options){
        return await ProductModel.paginate(query, options);
    }

    async save(productData){
        const newProduct = new ProductModel(productData);
        return await newProduct.save();
    }

    async update(id, productData){
        return await ProductModel.findByIdAndUpdate(id, productData);

    }

    async delete(id){
        return await ProductModel.findByIdAndDelete(id);
    }
}

module.exports = new ProductDao();