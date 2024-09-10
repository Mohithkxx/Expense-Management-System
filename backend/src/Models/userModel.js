import mongoose from "mongoose";

const {Schema} = mongoose;

const UserSchema = new Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["user", "admin", "superuser"],
        default: "user"
    },
    
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        education:[{type:String}],
        originalname:{type:String},
        resume:{
            type:String,
            default:""
        },
        profilephoto:{
            type:String,
            default:""
        }
    }
},{timestamps:true})

const User = mongoose.model("Registers", UserSchema);

export default User;