const app = require('express')();
const bodyparser = require('body-parser');
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));

let newItems = []
app.get('/', (req, res) => {
    let Options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today = new Date();
    let day = today.toLocaleDateString('en-US',Options);
    res.render("list", {KindOfDay: day, newListItems: newItems});
}); 

app.post('/', (req, res) => {
    let newItem = req.body.newItem;
    newItems.push(newItem);
    res.redirect('/');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});