const mongoose= require("mongoose")

const UserSchema= new mongoose.Schema({
    username:{
        type: String,
        require: true,
        min: 3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        min:6
    },
    password:{
        type: String,
        required:true,
        min:6,
    },
    profilePicture:{
        type:String,
        default: ""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{  
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:50
    },
    from:{    //home town city
        type:String,
        max:50
    },
    relationship:{
        type: Number,
        enum:[1,2,3]     //3 options as single , married or commited
    },
    referalCode:{
        type:String,
        max:20
    },

},

{ timestamps:true }    //when ever create a user or update it, it will automatically update the timestamp
 
);


module.exports=mongoose.model("User" , UserSchema)