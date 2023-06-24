var express = require('express');
const ToyModel = require('../models/ToyModel');
var router = express.Router();

router.get('/', async (req, res) => {
    var toy = await ToyModel.find({});
    res.render('toy/index', { toy: toy });
});

//search function
router.post('/search', async (req, res) => {
    var keyword = req.body.keyword;
    var toy = await ToyModel.find({ name: new RegExp(keyword, "i") })
    res.render('toy/index', { toy: toy })
 })

//sort function
router.get('/ascending', async (req, res) => {
    var toy = await ToyModel.find().sort({ price: 1 })
    res.render('toy/index', { toy: toy })
})

router.get('/descending', async (req, res) => {
    var toy = await ToyModel.find().sort({ price: -1 })
    res.render('toy/index', { toy: toy })
})


router.get('/delete/:id', async (req, res) => {

    await ToyModel.findByIdAndDelete(req.params.id)
        .then(() => { console.log('Delete figure succeed !') })
        .catch((err) => { console.log('Delete figure failed !') });

    res.redirect('/toy');
})

router.get('/drop', async (req, res) => {
    await ToyModel.deleteMany({})
        .then(() => { console.log('Delete all figure succeed !') });

    res.redirect('/toy');
})


router.get('/add', (req, res) => {
    res.render('toy/add');
})

router.post('/add', async (req, res) => {
    var toy = req.body;
    await ToyModel.create(toy)
        .then(() => { console.log('Add new figure succeed !') });
    res.redirect('/toy');
})

router.get('/edit/:id', async (req, res) => {
    var toy = await ToyModel.findById(req.params.id);
    res.render('toy/edit', { toy: toy });
})

router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var updatedData = req.body; 
    await ToyModel.findByIdAndUpdate(id, updatedData)
        .then(() => { console.log('Edit figure succeed !') });
    res.redirect('/toy');
})

module.exports = router;


