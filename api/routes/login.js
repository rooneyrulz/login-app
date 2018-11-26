const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login', (req, res, next) => {
   res.status(201).render('login', {title: 'Login'});
});

router.post('/login', (req, res, next) => {
   passport.authenticate('local', {
      successRedirect: '/home',
      failureRedirect: '/user/login',
      failureFlash: true
   })(req, res, next);
});


module.exports = router;
