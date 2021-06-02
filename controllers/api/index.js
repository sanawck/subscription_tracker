const router = require("express").Router();
const userRoutes = require("./userRoutes");
const eventsRoutes = require("./eventsRoutes");

router.use("/users", userRoutes);
router.use("/events", eventsRoutes);

module.exports = router;

// const router = require("express").Router();
// const userRoutes = require("./userRoutes");
// const projectRoutes = require("./projectRoutes");

// router.use("/users", userRoutes);
// router.use("/projects", projectRoutes);

// module.exports = router;
