const router = require("express").Router();
const profileRoutes = require("./profileRoutes");
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const withAuth = require("../utils/auth");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/profile", profileRoutes);

module.exports = router;
// const router = require("express").Router();
// const profileRoutes = require("./profileRoutes");
// const apiRoutes = require("./api");
// const homeRoutes = require("./homeRoutes");
// const withAuth = require("../utils/auth");

// router.use("/", homeRoutes);
// router.use("/api", apiRoutes);
// router.use("/profile", profileRoutes);

// module.exports = router;
