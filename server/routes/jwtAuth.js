const db = require("../db");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator.js");
const validInfo = require("../middleware/validInfo.js");
const authorization = require("../middleware/authorization.js");

//register
router.post("/register", validInfo, async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await db.users.findMany({
            where: {
                user_email: email
            }
        })
        if (user.length !== 0) {
            return res.status(401).json("User already exists")
        }

        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const bcryptPassword = await bcrypt.hash(password, salt)

        const newUser = await db.users.create({
            data: {
                user_name: name,
                user_email: email,
                user_password: bcryptPassword
            }
        })

        const token = jwtGenerator(newUser.user_id)
        res.json({ token })

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})


//login
router.post("/login", validInfo, async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await db.users.findMany({
            where: {
                user_email: email
            }
        })
        if (user.length === 0) {
            return res.status(401).json("Invalid Credential")
        }

        const validPassword = await bcrypt.compare(password, user[0].user_password)
        if (!validPassword) {
            return res.status(401).json("Invalid Credential")
        }

        const token = jwtGenerator(user[0].user_id)
        res.json({ token })

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true)

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

module.exports = router;