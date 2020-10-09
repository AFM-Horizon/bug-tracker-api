const express = require('express');
const bugController = require('../controllers/bugController');
const testController = require('../controllers/testBugController');

const router = express.Router();

router.get('/getAll', bugController.get_all_bugs);
router.get('/getById/:id', bugController.get_bug_by_id);
router.post('/add', bugController.create_bug_post);
router.patch('/update/:id', bugController.update_bug);

// Testing Only
router.get('/save', testController.create_bug);
router.get('/seed', testController.seed_data);

module.exports = router;
