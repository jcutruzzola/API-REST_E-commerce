
const ProductModel = require("../models/product.model.js");


class ProductManager {
    

    async addProduct({ title, description, price, img, code, stock, category, thumnails }) {

        try {
            
            if (!title || !description || !price || !code || !stock || !category) {
                console.log("Todos los campos son obligatorios");
                return;
            }
    
           const productExists = await ProductModel.findOne({code: code});

           if(productExists) {
                console.log("El código debe ser único");
                return;
           }
    
            const newProduct = new ProductModel ({
                title,
                description,
                price,
                img,
                code,
                stock,
                category,
                thumbnails: thumnails || [],
                status: true
            })
    
   
            await newProduct.save();


        } catch (error) {
            console.log("Error al agregar el producto");
            return null;
            
        }
    }

    async getProducts(limit = null, page = null, sortOrder = null) {

        
        try {
            const options = {};

            limit ? options.limit = limit : options.limit = 1000;

            page ? options.page = page : null;

            if(sortOrder) {
                options.sort = { price: sortOrder };
            }

            const productsArray = await ProductModel.paginate({}, options);
            return productsArray;

        } catch (error) {
            console.log("Error al obtener los productos", error);
            return null;

        }

    }

    async getProductById(id) {
        try {
            
            const product = await ProductModel.findById(id);

            if(!product){
                console.log("Producto no encontrado");
                return null
            }
            return product;

        } catch (error) {
            console.log("Error al buscar el producto", error); 
        }
    }

    
    //Método para actualizar productos: 

    async updateProduct(id, updatedProduct) {

        try {
            const productUpdate = await ProductModel.findByIdAndUpdate(id, updatedProduct);

            if(productUpdate) {
                console.log("No se encuentra el producto solicitado");
                return null;
            }

            return productUpdate

        } catch (error) {
            console.log("Tenemos un error al actualizar productos", error); 
        }
    }

    async deleteProduct(id) {
        try {

            const productDeleted = await ProductModel.findByIdAndDelete(id);

            if(!productDeleted) {
                console.log("No se encuentra el producto solicitado");
                return null;
            }

            console.log("Producto Eliminado correctamente");
            
        } catch (error) {
            console.log("Tenemos un error al eliminar productos"); 
        }
    }

}

module.exports = ProductManager; 