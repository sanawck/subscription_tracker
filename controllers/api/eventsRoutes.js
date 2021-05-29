const router = require("express").Router();

const { Events, User, Memberships } = require("../../models");
const withAuth = require("../../utils/auth");
const { route } = require("../homeRoutes");

router.post("/", withAuth, async (req, res) => {
  try {
    Events.create({
      ...req.body,
    }).then((newEvent) => {
      Memberships.create({
        user_id: req.session.user_id,
        events_id: newEvent.id,
      }).then(() => {
        res.status(200).send(newEvent);
      });
    });
    //res.status(200).json(newEvents);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/user", withAuth, async (req, res) => {
  Events.findAll({
    where: {
      "$participants->Memberships.user_id$": req.session.user_id,
    },
    include: [
      {
        model: User,
        through: Memberships,
        as: "participants",
        required: true,
      },
    ],
  })
    .then((events) => {
      res.status(200).send(events);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const eventData = await Events.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!eventData) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(eventData); //Mike
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", (req, res) => {
  Events.findAll({
    include: [
      {
        model: User,
        through: Memberships,
        // as: 'participants'
      },
    ],
  })
    .then((eventData) => res.render("handlebarname", eventData)) //res.render takes .json array and renders info through handlebars
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//

module.exports = router;
// const router = require("express").Router();

// const { Events, User, Memberships } = require("../../models");
// const withAuth = require("../../utils/auth");

// router.post("/", withAuth, async (req, res) => {
//   try {
//     const newEvents = await Events.create({
//       //////////
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newEvents);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.delete("/:id", withAuth, async (req, res) => {
//   try {
//     const eventData = await Events.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!eventData) {
//       res.status(404).json({ message: "No project found with this id!" });
//       return;
//     }

//     res.status(200).json(eventData); //Mike
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/", (req, res) => {
//   Events.findAll({
//     include: [
//       {
//         model: User,
//         through: Memberships,
//       },
//     ],
//   })
//     .then((eventData) => res.render("homepage.handlebars", eventData)) //res.render takes .json array and renders info through handlebars
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });
// //

// module.exports = router;
// const router = require('express').Router();
// const { Events } = require('../../models');
// const withAuth = require('../../utils/auth');

// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newEvent = await Event.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newEvent);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const eventData = await Event.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!EventData) {
//       res.status(404).json({ message: 'No project found with this id!' });
//       return;
//     }

//     res.status(200).json(projectData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
