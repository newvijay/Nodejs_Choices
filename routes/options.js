var express = require('express');
var router = express.Router();
const optionsCtrl = require('../controllers/options');


router.get('/new', isLoggedIn, optionsCtrl.new);
router.post('/', isLoggedIn, optionsCtrl.create);
router.get('/', isLoggedIn, optionsCtrl.index);
router.get('/show', isLoggedIn, optionsCtrl.getChoices);
router.get('/chart', isLoggedIn, optionsCtrl.showChart);
router.get('/:id', isLoggedIn, optionsCtrl.edit);
router.get('/edit/:id', isLoggedIn, optionsCtrl.showEditPage);
router.delete('/:id', isLoggedIn, optionsCtrl.deleteOption);
router.put('/edit/:id', isLoggedIn, optionsCtrl.updateOption);

//router.post('/show', isLoggedIn, optionsCtrl.makeChoice);
// router.post('/show', isLoggedIn, optionsCtrl.makeChoice);
 //router.get('/show', isLoggedIn, optionsCtrl.addChoice)
// router.delete('/options', optionsCtrl.delete);


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
       // res.redirect('/auth/google');
        next();
    }
}

module.exports = router;
