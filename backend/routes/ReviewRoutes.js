const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');

router.get('/', ReviewController.list);
router.get('/:id', ReviewController.show);
router.post('/', ReviewController.create);
router.put('/:id', ReviewController.update);
router.delete('/:id', ReviewController.remove);

module.exports = router;
