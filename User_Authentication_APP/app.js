const app = require('express')();
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');

const db =  mongoose.connect('mongodb+srv://rdevanshshukla26:<Password>@cluster0.baqjzal.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('Connected to MongoDB');
});


app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false
}));

const UserSchema = new mongoose.Schema({
    username:{
    type:String,
    required:true,
    },
    password:{
        type:String,
        required:true,
    }
});

const User =  mongoose.model('User',UserSchema);

app.post("/register", async (req, res, next)=>{
    const username = 'sample';
    const password = 'password';
    const hashedPW = await bcrypt.hash(password, 12);
    const user = await User.create({username,hashedPW});
    await user.save();
    return res.send(user);
});

app.post("/login", async (req, res, next)=>{
    const username = 'sample';
    const password = 'password';
    const user = await User.findOne({username});
    const matchstatus = await bcrypt.compare(password, user.hashedPW);
    if(matchstatus == true){
        console.log('logged in');
        req.session.user = user;
        return res.send(user);
    }
    else{
        return res.send("Wrong ID or Password");
    }
});

app.post("/logout", (req, res, next)=>{
    req.session.user = null;
    return res.send("Logged Out");
});

app.listen(3000, ()=>{
console.log("Running server on port 3000");
});
