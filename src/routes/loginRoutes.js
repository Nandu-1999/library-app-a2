const express = require("express");
const loginRouter = express.Router();
const userModel = require("../model/UserData");
const bcrypt= require('bcryptjs');



const adminNav = [
    {
        link:'/user/admin/books',
        name:'Books'
    },
    {
        link:'/user/admin',
        name:'Add Book'
    },{
        link:"author",
        name:"Author"
    },
    {
        link:'/logout',
        name:'Logout!'
    }
];



const booksRouter = require("./bookRoutes");
const adminRoutes = require("./adminRoutes")(adminNav);
const memberRouter = require("./memberRoutes");

    
const isAuth = (req,res,next)=>{
    if(req.session.isAuth){
        next();
    }
    else
    {
        res.redirect('/login')
    }

}

loginRouter.use("/books", isAuth,booksRouter);
loginRouter.use("/admin", isAuth,adminRoutes);
loginRouter.use("/member", isAuth,memberRouter);



//login
loginRouter.post("/",async(req,res)=>{
    const email = req.body.email;
    const psd = req.body.password;

    if(email==="admin@gmail.com" && password==="admin123"){
        req.session.isAuth= true;
        return res.redirect("/user/admin");
    }

    const userCheck = await userModel.findOne({email});
    const passCheck = await bcrypt.compare(psd,userCheck.password);

    if(!userCheck){
        return res.redirect("/login");
    }
    if(!passCheck){
        return res.redirect("/login");
    }
    
    req.session.isAuth = true;
    res.redirect('/member');

});


module.exports = loginRouter;
