const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const studentSchema=new Schema({
    name:String,
    email:String,
   website:String,
    image:String,
    gender:String,
    skills:{
        type:[String]
    }
    
});

module.exports=mongoose.model('student',studentSchema)