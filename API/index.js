const express= require('express')
const mongoose= require('mongoose')
const dotenv=require('dotenv')
const helmet = require('helmet')
const morgan= require('morgan')
const userRoute=require('./routes/users')
const authRoute=require('./routes/auth')
const postRoute=require('./routes/post')
const conversationRoute=require('./routes/conversations')
const messageRoute=require('./routes/messages')
const multer = require("multer")
const path= require("path")


const app=express();
dotenv.config();

//our secret url
mongoose.connect(process.env.MONGO_URL , {useNewUrlParser: true, useUnifiedTopology: true},(err)=>{ 
    if(err) console.log('error ',err)
    else
    console.log('conneted to mongoDB..')
}); 
 

app.use("/images",express.static(path.join(__dirname,"public/images")));

//middleware
app.use(express.json())     //it is body parser..when you make a post request it is goona parse it

app.use(helmet());      
app.use(morgan("common"));

//creating storage for uploading of file
const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images");
    },
    filename:(req,file,cb) =>{
        // cb(null,file.originalname);   //for postMan we write this so that we can upload from their as it will not take as string data.
        cb(null,req.body.name);   //this means that we will send this name inside our react application
    }
});
 //using multer and creating api for file upload
const upload =multer({storage :storage});
app.post("/api/upload",upload.single("file"), (req,res)=>{
    try{
        return res.status(200).json("File uploaded successfully.");
    }catch(err){
        console.log(err);
    }
})


app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/post',postRoute);
app.use('/api/conversations',conversationRoute);
app.use('/api/messages',messageRoute);

const port=8080;
app.listen(port , ()=>console.log(`Server running on port ${port}..`))
