const fs = require("fs").promises;

class CartManager {
    // static cantidad = 0;

    constructor(path) {
        this.carts = [];
        this.path = path;
        this.lastId = 0;
     // Path es la ubicacion del json.

     this.loadCarts();
    }

    
// Métodos auxiliares

async loadCarts() {
    try {
        const data = await fs.readFile(this.path, "utf-8");
        this.carts = JSON.parse(data);

        if(this.carts.length > 0) {
            this.lastId = Math.max(...this.carts.map(cart => cart.id));
            // Utilizo el metodo map para crear un nuevo array que solo tenga los id del carrito y con math.max obtengo el mayor.
            

        }

    } catch(error) {
        console.log("Error al cargar los carritos desde el archivo", error);
        await this.saveCarts();

    }

}

async saveCarts() {
    await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));

}

// Crear carrito

async createNewCart() {
    const newCart = {
        id: ++this.lastId,
        products: []

    }

    this.carts.push(newCart);

    // Guardar

    await this.saveCarts();

    return newCart;


}

// Carrito by id

async getCartById(cartId) {
    try {
        const cartFound = this.carts.find(cart => cart.id === cartId);

        if(!cartFound) {
            throw new Error("No existe el id proporcionado");
        }

        return cartFound;

    } catch(error) {
        console.log("Error al obtener carrito por id");
        throw Error;

    }

}


// Agregar productos al carrito

async addProductsToCart(cartId, productId, quantity = 1) {
    const cart = await this.getCartById(cartId);
    const productExists = cart.products.find(p => p.product === productId);

    if(productExists) {
        productExists.quantity += quantity;

    } else {
        cart.products.push({product: productId, quantity});

    }

    await this.saveCarts();
    return cart

}

    
}



module.exports = CartManager;