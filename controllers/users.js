const fs = require("fs")
const path = require("path")
const filePath = path.resolve(__dirname, "../data/users.json")
const usersArray = JSON.parse(fs.readFileSync(filePath, "utf8"))
const bcrypt = require("bcrypt");
const fetch=require("node-fetch");

const generateID = () => {
    if (usersArray.length != 0) {
        const lastProduct = usersArray[Number(usersArray.length) - Number(1)];
        const lastID = Number(lastProduct.id) + Number(1);
        return lastID;
    } else {
        const lastID = 1
        return lastID;
    }
};

const controllers = {

    login: (req, res) => {
        let isPasswordCorrect
        const userToLogin = usersArray.find(oneUser => oneUser.email === req.body.userlog)


        if (userToLogin) {

            isPasswordCorrect = bcrypt.compareSync(req.body.userpass, userToLogin.clave)

            if (isPasswordCorrect) {

                delete userToLogin.userpass
                req.session.userLogged = userToLogin;
                if (req.body.remember_user) {
                    res.cookie("email", userToLogin.email, { maxAge: (100 * 60) * 10 });
                }
            }

        }
        if (isPasswordCorrect) {
            return res.redirect("/users/profile")
        } else {
            res.status(400).send("las credenciales son invalidas")

        }

    },
    logout: (req, res) => {
        res.clearCookie('email');
        req.session.destroy();
        return res.redirect("/")
    },
    edit: (req, res) => {
        fetch("https://restcountries.com/v3.1/all")
        .then(response=>response.json())
        .then(countries=>{     
        return res.render("userEdit", { user: req.session.userLogged, countries:countries})
    })
    },
            

    editP: (req, res) => {
        usersArray.push(req.body)
        return res.redirect("/users/profile")
    },


    profile: (req, res) => {

        return res.render("usersProfile", {
            user: req.session.userLogged
        });

    },
    register: (req, res) => {
       

        const bodyData = req.body;
        delete bodyData.reclave

        usersArray.push({
            id: generateID(),
            ...bodyData,
            clave: bcrypt.hashSync(req.body.clave, 10),

        })
        fs.writeFileSync(filePath, JSON.stringify(usersArray, null, " "))

        return res.redirect("/")
    },
}


module.exports = controllers;