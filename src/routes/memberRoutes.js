const express = require("express");
const memberRouter = express.Router();
const booksData= require("../model/Bookdata")

const nav1 = [
    {
        link:'/member',
        name:'Books'
    },
    {
        link:'/logout',
        name:'Logout!'
    },
    {
        link:"/member/author",
        name:"Author"
    }
];

const isAuth = (req,res,next)=>{
    if(req.session.isAuth){
        next();
    }
    else
    {
        res.redirect('/login')
    }

}
function Router(nav1){
    memberRouter.get("/",isAuth,(req,res)=>{
        booksData.find()
        .then((books)=>{
            res.render("userBook",{
            nav1,
            title:"books",
            books
        })
        })
        
    })
    
    memberRouter.get("/:id",(req,res)=>{
        let id = req.params.id;
    
        booksData.findOne({_id:id})
        .then((book)=>{
            res.render("Singlebook",{
                nav:[
                    {
                     
                link:'/member',
                name:'Books'
            },
            {
                link:'/logout',
                name:'Logout!'
            }],    
                title:"Book",
                book
            });
        })
    })
return memberRouter;
}

module.exports = Router;
