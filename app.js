const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
let items = ['Buy Food', 'Cook Food', 'Eat Food'];
let workItem = [];

app.get('/', function(req,res){
   let today = new Date();
   let options = {
       day: 'numeric',
       month:'long',
       weekday:'long'

   }

   let day = today.toLocaleDateString('en-US');

   res.render('list', {
    listTitle: day,
    newListItems: items
   })

});

app.get('/work', function(req,res){
    res.render('list', {listTitle : 'Work List', newListItems: workItem})
})
app.post('/work', function(req,res){
    let item = req.body.newItem;
    workItem.push(item);
    res.redirect('/work')
})
app.post('/', function(req,res){
    let item = req.body.newItem;
    if(req.body.list === "Work"){
        workItem.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }

   
  
})


app.listen(3000, function(){
  console.log('Server stated on port 3000');	
});
