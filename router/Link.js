const express = require('express');
const router = express.Router();
const LinkController = require('../controller/Link');

router.get('/', LinkController.index);
router.post('/', LinkController.store);
router.get('/:link_id', LinkController.show);
router.delete('/:link_id', LinkController.destroy);
router.put('/:link_id', LinkController.update);

module.exports = router;