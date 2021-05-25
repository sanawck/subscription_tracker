const router = require('express').Router();
<<<<<<< HEAD
const { Events, User, Memberships } = require('../../models');//Mike
=======

const { Events, User, Memberships } = require('../../models');
>>>>>>> origin
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
<<<<<<< HEAD
    const newEvent = await Events.create({//Mike
=======

    const newEvent = await Events.create({
>>>>>>> origin
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newEvent);
<<<<<<< HEAD
=======

>>>>>>> origin
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
<<<<<<< HEAD
    const eventData = await Events.destroy({//Mike
=======
    const eventData = await Events.destroy({
>>>>>>> origin
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

<<<<<<< HEAD
    if (!eventData) {//Mike
=======
    if (!eventData) {
>>>>>>> origin
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(eventData);//Mike
  } catch (err) {
    res.status(500).json(err);
  }
});

<<<<<<< HEAD
//from Mike
=======
>>>>>>> origin
router.get('/', (req, res) => {
  Events.findAll({
    include: [
      {
        model: User,
        through: Memberships,
      },
    ],
  })
  .then((eventData) => res.render("handlebarname", eventData))//res.render takes .json array and renders info through handlebars
  .catch((err) => {
    console.log(err);
    res.status(500).json(err)
  })
})
//
<<<<<<< HEAD
=======

>>>>>>> origin

module.exports = router;
