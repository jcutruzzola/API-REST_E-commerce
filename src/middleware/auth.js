
// Admin vs User access

 function onlyAdmin(req, res, next){
    if(req.user.role === "admin"){
        next();
    } else {
        res.status(403).send("Acceso denegado, solo los administradores pueden ingresar");
    }
};


 function onlyUser(req, res, next) {
    if(req.user.role === "user"){
        next();
    } else {
        res.status(403).send("Solo se permite ingresar a Usuarios, ingrese como Administrador");

    }
};


module.exports = { onlyAdmin, onlyUser};