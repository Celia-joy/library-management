import mongoose from 'mongoose'
const memberSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Member name is required'],
        trim:true,
        minLength:6
    },
    email:{
        type:String,
        required:[true, 'Member email is required'],
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        maxLength:100
    }
},{timestamps:true});
const Member = mongoose.model('Member', memberSchema);
export default Member;