const ProductService = require("../services/product.service.js");
// const productModel = require("../dao/models/product.model.js");

class ProductController {

// Listar productos

    async getProducts(req, res){
        const { limit = 4, page = 1, sort = null, query = null } = req.query;
        
        try {
            const products = await ProductService.getProducts();
            console.log("funciona", products);

            res.json(products);

        } catch (error) {
            res.status(500).send("Error interno del servidor", error);
        }
    }


 /*    async getProducts(req, res){
        const products = await productModel.find();

        res.json(products);
    } */
// Listar productos con paginacion

    async getProductsPaginate(req, res){

        const limit = req.query.limit || 100;
        const page = req.query.page || 1;
        const orderQuery = req.query.sort;

        const sortOrder = orderQuery === "asc" ? 1 : (orderQuery === "des" ? -1 : null);

        try {

            const options = {
                limit: limit,
                page: page,
            }

            if(sortOrder){
                options.sort = { price: sortOrder };  
            } 

            // const options = { limit, page, sortOrder };
            const query = {}

            const arrayProducts = await ProductService.paginateProducts(query, options);
            
            res.send(arrayProducts);

        } catch (error) {
            res.status(500).send("Error al obtener productos", error);    
        }
    }


//Listar por ID\\

     async getProductById(req, res){
        let id = req.params.pid;

        try {
            const product = await ProductService.getProductById(id);
            if(!product){
                res.status(404).send("Producto no encontrado");
            } else{
                res.json(product);
            }

        } catch (error) {
            res.status(500).send("Error al buscar el id del producto");
        }
    }

// Crear Producto\\

    async createProduct(req, res){
        const { title, description, price, img, code, stock, category, thumbnails } = req.body;

        try {
            const newProduct = await ProductService.createProduct({
                title,
                description,
                price,
                img,
                code,
                stock,
                category,
                thumbnails: thumbnails || [],
                status: true,
            });

            res.status(201).json(newProduct);
        
        } catch (error) {
            res.status(500).json({status: "error", message: error.message});
            
        }
    }


// Actualizar Producto \\

    async updateProduct(req, res){
        let productId = req.params.pid;
        const productData = req.body;
        
        try {
            const updatedProduct = await ProductService.updateProduct(productId, productData);
            if(!updatedProduct) return res.status(400).send("Producto no encontrado");
            
            res.json(updatedProduct);

        } catch (error) {
            res.status(500).json({status: "error", message: "Error al actualizar el producto" });
        }
    }


// Eliminar Producto \\

    async deleteProduct(req, res){
        let id = req.params.pid;

        try {
            const deletedProduct = await ProductService.deleteProduct(id);
            if(!deletedProduct) return res.status(400).send("No se pudo encontrar el producto");
            
            res.json({message: "Producto eliminado"});

        } catch (error) {
            res.status(500).send("No se pudo eliminar el producto");
        }
    }
}


module.exports = ProductController;