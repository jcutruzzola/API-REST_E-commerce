const express = require("express"); 
const app = express(); 
const PUERTO = 8080;
const ProductManager = require("./dao/db/product-mananger-db.js");
const manager = new ProductManager();
const productRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const realTimeProductsRouter = require("./routes/realTimeProducts.router.js");
const exphbs = require("express-handlebars");
const socket = require("socket.io");
require ("./database.js");


// Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//Middleware
app.use(express.json());  
app.use(express.static("./src/public"));
app.use(express.urlencoded( {extended: true}));


//Rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter)
app.use("/", viewsRouter);
app.use("/", realTimeProductsRouter);


const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`); 
})

const io = socket(httpServer);

io.on("connection", async (socket) => {
    console.log("conectado ok");

    socket.emit("productos", await manager.getProducts());

    socket.on("deleteProduct", async (id) => {
        await manager.deleteProduct(id)


    io.sockets.emit("productos", await manager.getProducts());

    })


    socket.on("newProduct", async(data) => {
        const { title, description, price, code, stock, img, category } = data;
        await manager.addProduct(data)

        io.sockets.emit("productos", await manager.getProducts());
    })
    
})