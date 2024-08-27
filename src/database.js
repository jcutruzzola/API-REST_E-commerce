const mongoose = require ("mongoose");

mongoose.connect("mongodb+srv://jorgecutruzzola:jcut1245@cluster0.rmhgc.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> console.log("Conectado correctamente"))
.catch((error)=> console.log("Inconveniente al conectar: ", error));

