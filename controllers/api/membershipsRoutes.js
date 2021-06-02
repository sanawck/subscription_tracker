const router = require("express").Router();
const { Memberships } = require("../../models");



router.post('/', async (req, res) => {
    try {
        const membershipsData = await Memberships.create(req.body);

        res.session.save(() => {
            req.session.user_id = membershipsData.id;
            req.session.logged_in = true;

            res.status(200).json(membershipsData);
        })
    } catch (err) {
        res.status(400).json(err);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const membershipsData = await Memberships.destroy({
            where: { id: req.params.id }
        });
        if (!membershipsData) {
            res.status(404).json({ message: "no membership id" });
            return;
        }
        res.status(200).json(membershipsData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;