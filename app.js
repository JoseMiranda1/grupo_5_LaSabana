const express =require("express");
const app = express();
const path = require("path");
<<<<<<< HEAD
=======
const session = require("express-session")
>>>>>>> afd22df9dd1d1b18dd45de0a334356fa31232ef6

app.use(express.static(path.join(__dirname + '../public')));

app.listen(3000,()=> console.log ("Estamos usando el puerto 3000"));

app.set("view engine", "ejs")

const staticFiles = express.static(path.join(__dirname,"./public"));
app.use(staticFiles);

<<<<<<< HEAD

const mainRouter= require("./routes/main");
app.use("/", mainRouter)
=======
//setup del req.body
app.use(express.urlencoded({extended: false}));
app.use(express.json())

//session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))


const methodOverride=require("method-override")
app.use(methodOverride("_method"))


const mainRouter= require("./routes/main");
app.use("/", mainRouter)

const productsRoutes=require("./routes/products")
app.use("/products", productsRoutes)

const usersRouter=require("./routes/users")
app.use("/users",usersRouter)

app.use((req,res,next)=>{ 
    res.status(404).render("notFound")
})
>>>>>>> afd22df9dd1d1b18dd45de0a334356fa31232ef6
