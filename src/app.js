const express = require("express"); 
const app = express(); 
const PUERTO = 8080;

// const ProductManager = require("./dao/db/product-mananger-db.js");
// const manager = new ProductManager();
const productRouter = require("./routes/product.router.js");
const cartRouter = require("./routes/cart.router.js");
const viewsRouter = require("./routes/views.router.js");
// const userRouter = require("./routes/user.router.js");
const sessionRouter = require("./routes/session.router.js");
const realTimeProductsRouter = require("./routes/realTimeProducts.router.js");

const exphbs = require("express-handlebars");
const socket = require("socket.io");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const initializePassport = require("./config/passport.config.js");

require ("./database.js");


// Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//Middleware
app.use(express.json());  
app.use(express.static("./src/public"));
app.use(express.urlencoded( {extended: true}));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();


//Rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter)
app.use("/", viewsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/", realTimeProductsRouter);
// app.use("/api/sessions", userRouter)



const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`); 
});

module.exports = httpServer;

const socketIo = require("./utils/socket.js");
socketIo();


// const io = socket(httpServer);

/* io.on("connection", async (socket) => {
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
    
}); */