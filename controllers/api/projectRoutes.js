const router = require('express').Router();
const { Events, User, Memberships } = require('../../models');//Mike
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newEvent = await Events.create({//Mike
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newEvent);//Mike
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const eventData = await Events.destroy({//Mike
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!eventData) {//Mike
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(eventData);//Mike
  } catch (err) {
    res.status(500).json(err);
  }
});

//from Mike
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

module.exports = router;
