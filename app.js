const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser=require('body-parser');


app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017",{useNewUrlParser:true},{useUnifiedTopology:true});
let url="mongodb://localhost:27017";
const database ={
    name:String,
    email:String,
    password:String,
    dob:String,
    number:String
}

const data=mongoose.model("data",database);

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){


    let newData=new data({
        name:req.body.name,
        email:req.body.email,
        password:req.body.pass,
        dob:req.body.date,
        number:req.body.number
    })
  // res.send(req.body);
    mongoose.connect(url,function(err,db){
        
             // res.send(req.body);
                db.collection("register").insertOne(newData,function(err,db){
                  if(err)
                  {
                      throw err;
                  }
                   newData.save();
                    console.log("inserted successfully");
                 
                })
})

res.redirect("/login");
}) 

const dblogin ={

    email:String,
    password:String,
    
}


const data1=mongoose.model("data1",dblogin);


app.get("/login",function(req,res){
    
    res.sendFile(__dirname+"/login.html");
    
})

app.post("/login",function(req,res){


    let newDatalogin=new data1({
        
        email:req.body.email,
        password:req.body.pass
        

    })


mongoose.connect(url,function(err,db){
    

    let q={email:req.body.email,password:req.body.pass};
    
   db.collection("register").find(q).toArray(function(err,result){
    
        if(err)
        throw err;

        
       
        if(result.length>0)
        {
            
            res.redirect("/profile");

        }
        else{
            res.redirect("/login");
           
        
        }
    })
})
})
app.get("/profile",function(req,res){
    res.sendFile(__dirname+"/profileset.html");
})

app.listen(4000,function(){
    console.log("server running");
})