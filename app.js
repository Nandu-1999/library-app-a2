const express = require("express");
const app = express();
const session = require("express-session");
const Store = require("./src/model/SessionModel");
const bookdata = require("./src/model/Bookdata");

        
const nav = [
    {
        link:'/',
        name:'Home'
    },
    {
        link:'/signup',
        name:'Signup'
    },
    {
        link:'/login',
        name:'Login'
    }
];

const loginRoutes = require("./src/routes/loginRoutes");
const signupRoutes = require('./src/routes/signupRoutes');
const memberRoutes = require("./src/routes/memberRoutes")


// session middleware
app.use(session({
    //secrete key sign cookie
    secret:"Key Key Key",
    
    //for every request create new session
    resave:false,

    //not modified session, do not save
    saveUninitialized:false,

    store:Store

}))

app.use(express.urlencoded({extended:false}));
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./src/views");
app.use("/user",loginRoutes);
app.use("/register",signupRoutes);



//logout
app.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if(err) throw err;
        res.redirect('/');
    })
})


// load login page
app.get("/login",(req,res)=>{
    res.render("Login", {
        nav,
        title:"Login"
    })});

// load signup page
app.get("/signup",(req,res)=>{
    res.render("Signup", {
        nav,
        title:"SignUp"
    })});
    
// homepage
app.get("/", (req,res)=>{
    res.render("index",
    {
        nav,
        title:"Library App"
    })
   
});



app.listen(1230);