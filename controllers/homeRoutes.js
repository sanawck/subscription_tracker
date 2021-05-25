const router = require('express').Router();
const { Events, User } = require('../models');////////
const withAuth = require('../utils/auth');


// router.post('/api/users/login', async (req, res) => {
//   try {

//   }
// })
// router.get('/profile', async (req, res) => {
//   const userArr = 
// }
// router.get('/profile', async (req, res) => {
//   const userArr = await User.findAll();
// }

router.get('/homepage', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const eventData = await Events.findAll({/////////////
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });

      // Serialize data so the template can read it
      const events = eventData.map((event) => event.get({ plain: true }));//Mike

      // Pass serialized data and session flag into template
      res.render('homepage', { 
        events, //Mike
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/event/:id', async (req, res) => {//Mike
    try {
      const eventData = await Events.findByPk(req.params.id, {//Mike
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });

      const event = eventData.get({ plain: true });//Mike

      res.render('event', {//Mike
        ...event,//Mike
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Events }], //Mike
      });

      const user = userData.get({ plain: true });

      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile'); 
      return;
    }

    res.render('login');
});

module.exports = router;
