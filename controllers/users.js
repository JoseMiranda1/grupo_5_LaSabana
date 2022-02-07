const fs=require("fs")
const path=require("path")
const filePath=path.resolve(__dirname,"../data/users.json")
const usersArray=JSON.parse(fs.readFileSync(filePath,"utf8"))
const bcrypt = require("bcryptjs");
const generateID = () => {
    if(usersArray.length != 0){       
        const lastProduct =  usersArray[Number(usersArray.length) - Number(1)];	         
        const lastID = Number(lastProduct.id) + Number(1);	
        return lastID;
    }else{
        const lastID = 1
        return lastID;
    }
};

const controllers={
   
    login:(req,res)=>{
        let isPasswordCorrect
        const userToLogin= usersArray.find(oneUser => oneUser.email === req.body.userlog)         
    

        if(userToLogin){

       isPasswordCorrect=bcrypt.compareSync(req.body.userpass, userToLogin.clave)

        if(isPasswordCorrect){

         delete userToLogin.userpass
         req.session.userLogged = userToLogin;
            
        }
      
        }
          if(isPasswordCorrect){  
        return res.redirect("/users/profile")
          }else{
             res.status(400).send("las credenciales son invalidas")
            
          }
    
    },


    logout:(req,res)=>{
    req.session.destroy();
    return res.redirect("/")
    },


    profile:(req,res)=>{
        const usuarioPerfil=[{
            email: req.session.email,
            fechaNacimiento: "",  
            tel: 4152415241,
            direccion: "calle falsa 123"
        }]
        
        res.render("usersProfile",{user: usuarioPerfil})

    },
    register: (req,res)=>{    

      const bodyData=req.body;       
      delete bodyData.reclave      
   
      usersArray.push({
      id: generateID(),      
      ...bodyData,
      clave: bcrypt.hashSync(req.body.clave, 10),         
      email:req.body.email,                
    })
      fs.writeFileSync(filePath,JSON.stringify(usersArray, null, " "))

      return res.redirect("/")
    }
}


module.exports= controllers;