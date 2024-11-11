const express=require('express');
const app=express();
const users=require("./routes/user.js");
const cookieParser=require("cookie-parser");
const session=require("express-session");
const flash=require("connect-flash");

const sessionOption = {
    
    secret:"mysupersecretstring" ,
    resave: false, 
    saveUninitialized: true,
    // cookie: {
    //     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    //     maxAge: 7 * 24 * 60 * 60 * 1000, 
    //     httpOnly: true,
    // },
};
app.use(session( sessionOption ));
app.use(flash());

// app.use(session({secret:"mysupersecretstring"}));
app.use(cookieParser("secretcode"));
 app.get("/getcookies",(req,res)=>{
    res.cookie("greet","hello",{signed:true});
    res.send("sent you some cookies ");
 })
 app.listen(3000,()=>{
    console.log("server is listening to port ");
 })
 app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    req.flash("success","user regitered successfully");
    res.redirect("/hello");
 })

 app.get("/hello",(req,res)=>{
    console.log(req.flash("success"));
   res.render({name:req.session.name, msg: req.flash("success")});
 })
