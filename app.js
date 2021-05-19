const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser=require('body-parser');


app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/first",{useNewUrlParser:true},{useUnifiedTopology:true});
var url="mongodb://localhost:27017/first";
const mydb ={
    name:String,
    email:String,
    pass:String,
    dob:String,
    number:String,
	designation:String,
	degree:String,
	datecreated:String,
	dateupdated:String
}

const indexnote=mongoose.model("indexnote",mydb);

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    let newindexnote=new indexnote({
        name:req.body.name,
        email:req.body.email,
        pass:req.body.pass,
        dob:req.body.date,
        number:req.body.number,
		designation:null,
		degree:null,
		datecreated:Date().substring(4,15),
		dateupdated:null
    })
   
    
    mongoose.connect(url,function(err,db){
        
        //  res.send(req.body);
        let query={email:req.body.email,pass:req.body.pass};
        db.collection("regform").find(query).toArray(function(err,result){
           if(err)
           throw err;
           
          
           if(!result.length)
          
    {

           db.collection("regform").insertOne(newindexnote,function(err,db){
             if(err)
             {
                 throw err;
             }
              newindexnote.save();
             console.log(" inserted successfully");
              res.redirect("/login");
          
           

           })
       }
       else{
           console.log("data already exists");
           res.redirect("/reg");
       }
          

         
       })  


               

              
        
})

})

const logindb ={
    
    email:String,
    pass:String,
    
}

const log=mongoose.model("log",logindb);


app.get("/login",function(req,res){
   res.sendFile(__dirname+"/login.html");
   
})




app.post("/login",function(req,res){
    let logindb=new log({
        
        email:req.body.email,
        pass:req.body.pass,
        
    })
   
    mongoose.connect(url,function(err,db){
        let query={email:req.body.email,pass:req.body.pass};
        db.collection("regform").find(query).toArray(function(err,result){
            if(err)
            throw err;
            
           
            if(result.length>0)
            {
                res.redirect("/profile")

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
app.post("/profile",function(req,res){
    res.redirect("/update");
})



const deletedb ={
   
    email:String
   
}

const del=mongoose.model("delete",deletedb);

app.get("/delete",function(req,res){
    res.sendFile(__dirname+"/delete.html");
})

app.post("/delete",function(req,res){
    let deletedb=new del({
       
        email:req.body.email
      
       
    })
   
    mongoose.connect(url,function(err,db){
        let query={email:req.body.email};
             
            
                db.collection("regform").deleteMany(query,function(err,result){
                  if(err)
                  {
                      throw err;
                  }
					else
					{
                   
                    console.log("deleted successfully");}
                 
                })

               

              
        
})
res.redirect("/profile");

})


const readSchema ={
    email:String,
    
}

const read=mongoose.model("read",readSchema);

app.get("/read",function(req,res){
    res.sendFile(__dirname+"/read.html");
})

app.post("/read",function(req,res){
    let newread=new read({
        email:req.body.email,
        
    })

    mongoose.connect(url,function(err,db){
        let quer={email:req.body.email};
     
             db.collection("regform").find(quer).toArray(function(err, result) {
                if (err) throw err;
            
                if(result.length>0)
                {
                    res.redirect("/profile");
                    
                }
                else
                {
                   console.log("no records found:(")
                   res.redirect("/read");
                }
                  
                  console.log(result);
                })

               

              
        
})

        
})










const updateSchema ={
    email:String,
	degree:String,
	designation:String,
	datecreated:String,
	dateupdated:String
        
    
}

const update=mongoose.model("update",updateSchema);

app.get("/update",function(req,res){
    res.sendFile(__dirname+"/update.html");
})

app.post("/update",function(req,res){
   

    
    let newup=new update({
        email:req.body.email,
		degree:req.body.degree,
		desig:req.body.desig,
		dateupdated:req.body.dateu
        
    })
   res.send(req.body);
    mongoose.connect(url,function(err,db){
        let upquer={email:req.body.email};
        var newvalues = { $set: {designation:req.body.desig,degree:req.body.degree,dateupdated:req.body.dateu} };
      
        db.collection("regform").updateMany(upquer, newvalues, function(err, res)  {
                if (err) throw err;
            
				else{
						
                
					console.log("updated successfully");
			
					}
                 
                })

               
                
              
        
})
res.redirect("/profile");


})








app.listen(4000,function(){
    console.log("server running");
})

