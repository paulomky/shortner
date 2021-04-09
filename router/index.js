const express = require('express');
const router = express.Router();
const { Link } = require('../models');

router.use('/api/link', require('./Link'));
router.use('/api/user', require('./User'));

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

router.get('/api/:link', async (req, res) => {
    const { link } = req.params;
    const links = await Link.findOne({
        where: { link }
    });

    if(!links){
        return res.status(404);
    }

    if(validURL(links.url)) {
        res.redirect(links.url);
    }else{
        res.redirect("https://www.google.com/search?q="+links.url);
    }
})

module.exports = router;