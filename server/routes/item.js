const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const loginController = require('../controllers/loginController');
//router homepage
router.get('/',itemController.homepage)

//router crud product
router.get('/add', itemController.additem)
router.post('/add', itemController.postitem)
router.get('/view/:id',itemController.viewitem)
router.get('/edit/:id',itemController.edititem)
router.put('/edit/:id',itemController.editpost)
router.get('/addpage',itemController.addpage)
router.delete('/edit/:id', itemController.deleteitem);

//router login/register
router.get('/login',loginController.login)
router.post('/login',loginController.userlogin)
router.get('/register',loginController.register)
router.post('/register', loginController.userregister)


module.exports = router;