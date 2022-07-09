const express=require('express');
const app=express();
const path=require('path');
const ejsMate=require('ejs-mate');
const student=require('./schemas.js');
const dbUrl='mongodb://localhost:27017/reg-form';
const methodOverride=require('method-override');
const mongoose=require('mongoose');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
mongoose.connect(dbUrl,{ useNewUrlParser: true , useUnifiedTopology: true,})
const db=mongoose.connection
db.on('error',console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database Connected")
})
app.use(express.static(path.join(__dirname,'public')));
app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.get('/register',async(req,res)=>{
    const students=await student.find();
    res.render('index',{students});
})
app.post('/register',async(req,res,next)=>{
        const newStudent=new student(req.body.student);
        await newStudent.save();
        res.redirect('/register')
     })


const port=3000;
app.listen(port,()=>{
    console.log(`Listening on Port ${port}`)
})