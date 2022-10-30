const express = require('express');
const app = express();
const methodOverride = require('method-override');
const { nanoid } = require('nanoid');

const inve = [];

app.use(express.urlencoded({
    extended: true
  }));
app.use(methodOverride('_method'));  

app.set('view engine', 'ejs');


// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});


//GET inventory page
app.get('/items', function(req, res) {
    
    const item = undefined;
    res.render('pages/items', {item});
    
});

//POST to inventory 
app.post('/items', function(req, res) {
    
   
   const newid = nanoid(10);
    const item = {
        id: newid,
        type: req.body.itemType,
        label: req.body.conName,
        descript: req.body.conDesc,
        loc: req.body.conLoc
    }
    //console.log(req.body);
   
    //inve.push(item);

    res.render('pages/items', {
        
        item        
    });
    
});

//GET edit page by item :id
app.get('/items/:id/edit', function(req, res) {
    const data = req.params.id;
    res.render('pages/edit', {
        data
    });
    
});

//PUT updated inventory item
app.put('/items/:id', function(req, res){
    //find item
    
    //TODO: err check
    //TODO: validate
    //update item
    const item = {
        id: req.body.id,
        type: req.body.itemType,
        label: req.body.conName,
        descript: req.body.conDesc,
        loc: req.body.conLoc
    }

    res.render('pages/items', {
        item
    })
})

//DELETE inventory item
app.delete('/items/:id', function(req, res) {
    
        const itemDel = req.body.id;

        res.render('pages/items', {
            itemDel
        });
    
});



app.listen(8080, () => console.log('Server is listening on port 8080'));


