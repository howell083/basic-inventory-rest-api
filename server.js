const express = require('express');
const app = express();
const methodOverride = require('method-override');
//import { nanoid } from 'nanoid'
const { nanoid } = require('nanoid');

//var bodyParser = require('body-parser');
//app.use(express.json);
const inve = [];
const invItems = {};
app.use(express.urlencoded({
    extended: true
  }));
app.use(methodOverride('_method'));  
//var jsonParser = bodyParser.json;

app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});


//GET inventory page
app.get('/invent', function(req, res) {
    
    
    res.render('pages/invent', {
        inve:inve
    });
    
});

//POST to inventory 
app.post('/invent', function(req, res) {
    
    /*
    function invBodyParse (reqBody) {
        
        return "Type: " + reqBody.itemType + "  " + "Label: " + reqBody.conName + "  " + "Description: " + reqBody.conDesc + "  " + "Located at: " + reqBody.conLoc;
    }
    */
   const newid = nanoid(10);
    const item = {
        id: newid,
        type: req.body.itemType,
        label: req.body.conName,
        descript: req.body.conDesc,
        loc: req.body.conLoc
    }
    console.log(req.body);
   // const result = invBodyParse(req.body);
    inve.push(item);

    res.render('pages/invent', {
        inve: inve        
    });
    
});

//GET edit page by item :id
app.get('/invent/:id/edit', function(req, res) {
    const found = inve.find(items => items.id === req.params.id);
    console.log(found.label);
    console.log(found.type);
    res.render('pages/edit', {
        data: found
    });
    
});

//PUT updated inventory item
app.put('/invent/:id', function(req, res){
    //find item
    const itemToUpdate = inve.find(items => items.id === req.params.id);
    //err check
    //validate
    //update item
    itemToUpdate.label = req.body.conName;
    itemToUpdate.type = req.body.itemType;
    itemToUpdate.descript = req.body.conDesc;
    itemToUpdate.loc = req.body.conLoc;

    res.render('pages/invent', {
        inve: inve
    })
})

//DELETE inventory item
app.delete('/invent/:id', function(req, res) {
    

    const found = inve.some(items => items.id === req.params.id);
    console.log(found + ": " + req.params.id );
    if(!found) {
        res.status(400)
    } else {
        const foundIndex = inve.findIndex(items => items.id === req.params.id);
        console.log(foundIndex);
        inve.splice((foundIndex), 1);
        res.render('pages/invent', {
            inve: inve
        });
    }
});

app.listen(8080);
console.log('Server is listening on port 8080');