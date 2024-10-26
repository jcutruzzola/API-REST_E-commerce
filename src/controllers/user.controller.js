const userService = require("../services/user.service.js");
const jwt = require("jsonwebtoken");
const UserDTO = require("../dto/user.dto.js");


class UserController {
    
    async register(req, res) {

        const { first_name, last_name, age, email, password } = req.body;

        try {
            const newUser = await userService.registerUser({
                first_name,
                last_name,
                age,
                email,
                password });

            const token = jwt.sign({usuario: `${newUser.first_name} ${newUser.last_name}`, email: newUser.email, role: newUser.role, age: newUser.age}, "jorcut", { expiresIn: "2h"});

            res.cookie("cookieTokenJc", token, {maxAge: 3600000, httpOnly: true});

            res.redirect("/api/sessions/current");

           

        } catch (error) {
            res.status(500).send({error: error});  
        }
    }

    async login(req, res){

        const {email, password } = req.body;

        try {
            
            const user = await userService.loginUser(email, password);

            const token = jwt.sign({usuario: `${user.first_name} ${user.last_name}`, email: user.email, role: user.role, age: user.age}, "jorcut", {expiresIn: "2h"});
            res.cookie("cookieTokenJc", token, {maxAge: 3600000, httpOnly: true});
            res.redirect("/api/sessions/current");


        } catch (error) {
            res.status(500).send({error: error});  
        }

    }

    async current(req, res){

        if(req.user){
            const user = req.user;
            const userDTO = new UserDTO(user);
            res.render("profile", {user: userDTO});
            
        }else {
            res.send("usuario no autorizado")
        }

    }

    async logout(req, res){
        res.clearCookie("cookieTokenJc");
        res.redirect("/login");

    }
}

module.exports = UserController;
