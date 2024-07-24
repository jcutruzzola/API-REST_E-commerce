const fs = require("fs").promises;


class ProductManager {
    static ultId = 0;

    constructor(path) {
        this.path = path;
        this.products = [];

        this.loadArray();
    }

    async loadArray() {
        try {
            this.products = await this.readProduct();

        } catch (error) {
            console.log("Error al iniciar");
        }


    }

    async addProduct({ title, description, price, img, code, stock }) {

        if (!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }


        if (this.products.some(item => item.code === code)) {
            console.log("El codigo debe ser unico");
            return;
        }

        const lastProductId = this.products.length > 0 ? this.products[this.products.length -1].id : 0;

        const newProduct = {
            id: lastProductId + 1,
            title,
            description,
            price,
            img,
            code,
            stock
        }

        //4) Metemos el producto al array. 
        this.products.push(newProduct);

        //5) Lo guardamos en el archivo: 
        await this.saveProduct(this.products);
    }

    async getProducts() {
        try {
            const arrayProductos = await this.readProduct(); 
            return arrayProductos;
        } catch (error) {
            console.log("Error al leer el archivo", error); 
        }

    }

    async getProductById(id) {
        try {
            const arrayProductos = await this.readProduct();
            const buscado = arrayProductos.find(item => item.id === id); 

            if (!buscado) {
                console.log("producto no encontrado"); 
                return null; 
            } else {
                console.log("Producto encontrado"); 
                return buscado; 
            }
        } catch (error) {
            console.log("Error al buscar por id", error); 
        }
    }

    //Métodos auxiliares: 
    async readProduct() {
        const respuesta = await fs.readFile(this.path, "utf-8");
        const arrayProductos = JSON.parse(respuesta);
        return arrayProductos;
    }

    async saveProduct(arrayProductos) {
        await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    }

    //Método para actualizar productos: 

    async updateProduct(id, updatedProduct) {

        try {
            const arrayProductos = await this.readProduct(); 

            const productIndex = arrayProductos.findIndex(item => item.id === parseInt(id)); 

            if(productIndex !== -1) {
                arrayProductos[productIndex] = {...arrayProductos[productIndex], ...updatedProduct} ; 
                await this.saveProduct(arrayProductos); 

                console.log("Producto actualizado"); 
            } else {
                console.log("No se encuentra el indice"); 
            }
        } catch (error) {
            console.log("Tenemos un error al actualizar productos"); 
        }
    }

    async deleteProduct(id) {
        try {
            const arrayProductos = await this.readProduct(); 

            const index = arrayProductos.findIndex( item => item.id === parseInt(id)); 

            if(index !== -1) {
                arrayProductos.splice(index, 1); 
                await this.saveProduct(arrayProductos); 
                console.log("Producto eliminado"); 
            } else {
                console.log("No se encuentra el producto"); 
            }
        } catch (error) {
            console.log("Tenemos un error al eliminar productos"); 
        }
    }

}

module.exports = ProductManager; 