const httpServer = require("../app.js");
const socket = require("socket.io");
const ProductService = require("../services/product.service.js");
const ProductDTO = require("../dto/product.dto.js");


const socketIo = () => {

    const io = socket(httpServer);

    io.on("connection", async(socket) =>{
    
        console.log("Socket conectado okey");
    
        socket.emit("productos", await ProductService.getProducts());
    
        socket.on("deleteProduct", async(id) => {
            await ProductService.deleteProduct(id);
            io.sockets.emit("productos", await ProductService.getProducts());
        });
    
        socket.on("newProduct", async(data) => { 

            const { title, description, price, code, stock, img, category, status = true } = data;

            const newProduct = new ProductDTO(data);

            await ProductService.createProduct(newProduct);
    
            io.sockets.emit("productos", await ProductService.getProducts());
            
        });
    });
    
}


module.exports = socketIo;

