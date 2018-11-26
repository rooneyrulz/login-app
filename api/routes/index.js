const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
   res.status(201).render('index', {title: 'Home'});
});


module.exports = router;
