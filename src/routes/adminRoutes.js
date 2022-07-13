const express = require("express");
const adminRouter = express.Router();
const Bookdata = require('../model/Bookdata');
const multer = require('multer');


const book= [
    {
        link:"#",
        name:'Books'
    },
    {
        link:"/user/admin",
        name:'Add Books'
    },
    {
        link:'/logout',
        name:'Logout'
    }
];
    
const booksRouter = require("./bookRoutes")(book);
adminRouter.use("/books",booksRouter);

//multer control
const uplodcntrl = multer.diskStorage({

    destination:function(req,file,cb){
        cb(null,"./public/image")
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage:uplodcntrl});



function router(nav){

    adminRouter.get('/',(req,res)=>{
    res.render("addbook",{
        nav:[
            {
        link:"/user/admin/books",
        name:'Books'
    },
    {
        link:"/user/admin",
        name:'Add Books'
    },
    {
        link:"/user/admin/author",
        name:"Author"
    },
    {
        link:'/logout',
        name:'Logout'
    }
],
    title:"Add Book"
})
})

const authorRouter = require("./authorRoutes")(nav);
adminRouter.use("/author",authorRouter);



//add new book
adminRouter.post("/add",upload.single('image'),(req,res)=>{
    
var items=
    {
    title:req.body.title,
    author:req.body.author,
    genre:req.body.genre,
    image:req.file.filename
   }
   var book = Bookdata(items);
   book.save()
   .then(()=>{
   res.redirect('/user/admin/books');
   })
})



// update page
adminRouter.get("/update/:id",(req,res)=>{
    let id=req.params.id;
    
    Bookdata.findOne({_id:id})
    .then((data)=>{
        res.render("update",{
            title:"update",
            data,
            nav
        })
    })

});


// update db
adminRouter.post("/changedb/:id",upload.single('image'),async (req,res)=>{
    let id = req.params.id;
    console.log(id)
    const {title,author,genre} = req.body;
    const image = req.file.filename;

    const changeData ={
        title,
        author,
        genre,
        image
    }

     await Bookdata.findByIdAndUpdate(id,{$set:changeData})
     .then(()=>{
        res.redirect("/user/admin/books")
     })

})


return adminRouter;

}

module.exports = router;