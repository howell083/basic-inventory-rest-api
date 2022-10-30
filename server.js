const express = require('express');
const app = express();
const methodOverride = require('method-override');
const { nanoid } = require('nanoid');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));  
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/items', function(req, res) {
    
    const item = undefined;
    res.render('pages/items', {item});
    
});

app.get('/items/:id/edit', function(req, res) {
    const data = req.params.id;
    res.render('pages/edit', {
        data
    });
    
});


app.post('/items', function(req, res) {
    
   
   const newid = nanoid(10);
    const item = {
        id: newid,
        type: req.body.itemType,
        label: req.body.conName,
        descript: req.body.conDesc,
        loc: req.body.conLoc
    }

    res.render('pages/items', {
        
        item        
    });
    
});


app.put('/items/:id', function(req, res){
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


app.listen(8080, () => console.log('Server is listening on port 8080'));