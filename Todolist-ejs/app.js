const app = require('express')();
const bodyparser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb+srv://rdevanshshukla26:<Password>@cluster0.baqjzal.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}).then (() =>{
    console.log('Connected to DB');
});

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));

let newItems = []
app.get('/', (req, res) => {
    let Options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today = new Date();
    let day = today.toLocaleDateString('en-US',Options);
    res.render("list", {KindOfDay: day, newListItems: newItems});
}); 

const Userschema = new mongoose.Schema({
    newItem:{
        type: String,}
});

app.post('/', (req, res) => {
    let newItem = req.body.newItem;
    newItems.push(newItem);
    res.redirect('/');
    
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});