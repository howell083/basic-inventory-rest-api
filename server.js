const express = require('express');
const app = express();
const methodOverride = require('method-override');
const {nanoid} = require('nanoid');
const inve = [];

app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index');
});

app.get('/invent', function (req, res) {

    res.render('pages/invent', {
        inve: inve
    });

});

app.post('/invent', function (req, res) {
    const newid = nanoid(10);
    const item = {
        id: newid,
        type: req.body.itemType,
        label: req.body.conName,
        descript: req.body.conDesc,
        loc: req.body.conLoc
    }
    inve.push(item);
    res.render('pages/invent', {
        inve: inve
    });

});

app.get('/invent/:id/edit', function (req, res) {
    const found = inve.find(items => items.id === req.params.id);
    res.render('pages/edit', {
        data: found
    });
});

app.put('/invent/:id', (req, res) => {
    const itemToUpdate = inve.find(items => items.id === req.params.id);
    itemToUpdate.label = req.body.conName;
    itemToUpdate.type = req.body.itemType;
    itemToUpdate.descript = req.body.conDesc;
    itemToUpdate.loc = req.body.conLoc;

    res.render('pages/invent', {
        inve: inve
    })
})

app.delete('/invent/:id', function (req, res) {

    const found = inve.some(items => items.id === req.params.id);
    console.log(found + ": " + req.params.id);
    if (!found) {
        res.status(400)
    } else {
        const foundIndex = inve.findIndex(items => items.id === req.params.id);
        inve.splice((foundIndex), 1);
        res.render('pages/invent', {
            inve: inve
        });
    }
});

app.listen(8080, () => console.log('Server is listening on port 8080'));