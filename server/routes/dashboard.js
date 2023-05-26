const router = require("express").Router();
const db = require("../db");
const authorization = require("../middleware/authorization.js");

router.get("/", authorization, async (req, res) => {
    try {
        const user = await db.users.findFirstOrThrow({
            where: {
                user_id: req.user
            },
            select: {
                user_name: true
            }
        })
        
        res.json(user)

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

module.exports = router;