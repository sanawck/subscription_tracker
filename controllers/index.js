const router = require("express").Router();
const profileRoutes = require("./profileRoutes");
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const withAuth = require("../utils/auth");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/profile", profileRoutes);

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected' });
});


module.exports = router;

