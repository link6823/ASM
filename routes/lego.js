//lego 
var express = require('express');
const LegoModel = require('../models/LegoModel');
var router = express.Router();

router.get('/', async (req, res) => {
    var lego = await LegoModel.find({});
    res.render('lego/index', { lego: lego });
});

//search function
router.post('/search', async (req, res) => {
    var keyword = req.body.keyword;
    var lego = await LegoModel.find({ name: new RegExp(keyword, "i") })
    res.render('lego/index', { lego: lego })
 })

//sort function
router.get('/ascending', async (req, res) => {
    var lego = await LegoModel.find().sort({ price: 1 })
    res.render('lego/index', { lego: lego })
})

router.get('/descending', async (req, res) => {
    var lego = await LegoModel.find().sort({ price: -1 })
    res.render('lego/index', { lego: lego })
})


router.get('/delete/:id', async (req, res) => {

    await LegoModel.findByIdAndDelete(req.params.id)
        .then(() => { console.log('Delete lego succeed !') })
        .catch((err) => { console.log('Delete lego failed !') });

    res.redirect('/lego');
})

router.get('/drop', async (req, res) => {
    await LegoModel.deleteMany({})
        .then(() => { console.log('Delete all lego succeed !') });

    res.redirect('/lego');
})


router.get('/add', (req, res) => {
    res.render('lego/add');
})

router.post('/add', async (req, res) => {
    var lego = req.body;
    await LegoModel.create(lego)
        .then(() => { console.log('Add new figure succeed !') });
    res.redirect('/lego');
})

router.get('/edit/:id', async (req, res) => {
    var lego = await LegoModel.findById(req.params.id);
    res.render('lego/edit', { lego: lego });
})

router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var updatedData = req.body; 
    await LegoModel.findByIdAndUpdate(id, updatedData)
        .then(() => { console.log('Edit figure succeed !') });
    res.redirect('/lego');
})

module.exports = router;