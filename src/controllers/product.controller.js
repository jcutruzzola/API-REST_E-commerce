const productService = require("../services/product.service.js");


class ProductController {

// Listar productos

    async getProducts(req, res){
        const { limit = 4, page = 1, sort, query } = req.query;

        try {
            const products = await productService.getProducts({limit, page, sort, query});
            res.json(products);

        } catch (error) {
            res.status(500).send("Error interno del servidor");
        }
    }

// Listar productos con paginacion

    async getProductsPaginate(req, res){

        const limit = parseInt(req.query.limit) || null;
        const page = parseInt(req.query.page) || null;
        const orderQuery = req.query.sort;
        const sortOrder = orderQuery === "asc" ? 1 : (orderQuery === "des" ? -1 : null);

        try {

            const options = { limit, page, sortOrder };
            const query = {}

            const arrayProducts = await productService.paginateProducts(query, options);
            
            console.log(arrayProducts);

            res.send({
                result: "Success",
                payload: arrayProducts.docs,
                totalPages: arrayProducts.totalPages,
                prevPage: arrayProducts.prevPage,
                nextPage: arrayProducts.nextPage,
                page: arrayProducts.page,
                hasPrevPage: arrayProducts.hasPrevPage,
                hasNextPage: arrayProducts.hasNextPage,
                prevLink: arrayProducts.prevLink = arrayProducts.hasPrevPage ? `http://localhost:8080/?page=${arrayProducts.prevPage}` : null,
                nextLink: arrayProducts.nextLink = arrayProducts.hasNextPage ? `http://localhost:8080/?page=${arrayProducts.nextPage}` : null,
            });

        } catch (error) {
            res.status(500).send("Error al obtener productos", error);    
        }
    }


//Listar por ID\\

     async getProductById(req, res){
        let id = req.params.pid;

        try {
            const product = await productService.getProductById(id);
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
            const newProduct = await productService.createProduct({
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
            const updatedProduct = await productService.updateProduct(productId, productData);
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
            const deletedProduct = await productService.deleteProduct(id);
            if(!deletedProduct) return res.status(400).send("No se pudo encontrar el producto");
            
            res.json({message: "Producto eliminado"});

        } catch (error) {
            res.status(500).send("No se pudo eliminar el producto");
        }
    }
}


module.exports = ProductController;