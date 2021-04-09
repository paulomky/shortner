const express = require('express');
const router = express.Router();
const UserController = require('../controller/User');

router.get('/', UserController.index);
router.post('/', UserController.store);
router.get('/:user_id', UserController.show);
router.delete('/:user_id', UserController.destroy);
router.put('/:user_id', UserController.update);

module.exports = router;