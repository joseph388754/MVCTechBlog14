const router = require("express").Router();


router.get("/", (req, res) => {
  res.render("homepage", {
    logged_in: req.session.logged_in,
  })
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render("signup")
})

module.exports = router;