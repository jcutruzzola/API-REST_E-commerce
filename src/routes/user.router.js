const express = require("express");
const router = express.Router();
const { createHash, isValidPassword } = require("../utils/bcrypt.js");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const CartModel = require("../dao/models/cart.model.js");


const UserModel = require("../dao/models/user.model.js");



// Register - New User - \\

router.post("/register", async (req, res) => {

    const {first_name, last_name, age, email, password} = req.body;


    try {
        
        const foundUser = await UserModel.findOne({email});

        if(foundUser) {
            return res.status(400).send("El usuario ya se encuentra registrado");
        }

        //Cart

        const newCart = new CartModel();
        await newCart.save();


        const newUser = new UserModel({
            first_name,
            last_name,
            age,
            email,
            cart: newCart._id,
            password: createHash(password)

        });

        await newUser.save();
       
        //Token
        const token = jwt.sign({user: { first_name: newUser.first_name, last_name: newUser.last_name, age: newUser.age, email: newUser.email }} , "jorcut", { expiresIn: "2h"});

        //Cookie
        res.cookie("cookieTokenJc", token, {maxAge: 3600000, httpOnly: true});

        res.redirect("current");

    } catch (error) {

            res.status(500).send("Error al registrar usuario");
    }

});


// Login \\

router.post("/login", async (req, res) => {
    
    const { email, password } = req.body;

    try {
        
        const foundUser = await UserModel.findOne({email});

        if(!foundUser) {
            return res.status(401).send("Usuario no identificado");
        }
        
        if(!isValidPassword(password, foundUser)){
            return res.status(401).send("credenciales invalidas");
        }
           
        const token = jwt.sign({user: { first_name: foundUser.first_name, last_name: foundUser.last_name, age: foundUser.age, email: foundUser.email, role: foundUser.role}}, "jorcut", {expiresIn: "1h"});

        res.cookie("cookieTokenJc", token, {maxAge: 360000, httpOnly: true});
        res.redirect("current");

    } catch (error) {
        res.status(500).send("Error interno del servidor");    
    }
});


// Logout \\
router.post("/logout", (req, res) => {

    res.clearCookie("cookieTokenJc");
    res.redirect("/login");

});


// Profile \\

router.get("/current", passport.authenticate("current", {session: false}), (req, res) => {

    res.render("profile", {user: req.user.user});

});


// Admin profile \\

router.get("/admin", passport.authenticate("current", {session: false}), (req, res) => {
    
    if(req.user.user.role !== "admin"){
        return res.status(403).send("Acceso denegado");
    }

    res.render("admin", {user: req.user.user});

})

module.exports = router;