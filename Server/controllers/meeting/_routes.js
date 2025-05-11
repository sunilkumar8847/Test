const express = require('express');
const { add, index, view, deleteData, deleteMany } = require('./meeting');
const auth = require('../../middelwares/auth');
const router = express.Router();
router.post('/add', auth, add);
router.get('/index', auth, index);
router.get('/view/:id', auth, view);
router.delete('/delete/:id', auth, deleteData);
router.post('/deleteMany', auth, deleteMany);
module.exports = router