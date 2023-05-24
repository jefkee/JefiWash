const db = require("../db");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator.js");
const validInfo = require("../middleware/validInfo.js");
const authorization = require("../middleware/authorization.js");
const jwt = require("jsonwebtoken");


router.post('/order', authorization, async (req, res) => {
    const tokenData = req.header("token")
    // console.log(tokenData)
    const decodedToken = jwt.decode(tokenData)
    // console.log(decodedToken)
    const user_id = decodedToken.user

    try {
        const {
            name,
            surname,
            carMake,
            carModel,
            carYear,
            dateTime,
            lat,
            lng,
        } = req.body;

        const existingUser = await db.users.findMany({
            where: {
                user_id: user_id
            }
        })

        const newCustomer = await db.customers.create({
            data: {
                customer_first_name: name,
                customer_last_name: surname,
                customer_address: lat + " " + lng,
                customer_userId: existingUser[0].user_id,
            }
        });

        const newVehicle = await db.vehicles.create({
            data: {
                make: carMake,
                model: carModel,
                year: carYear,
                customerId: newCustomer.customer_id
            }
        });

        const newOrder = await db.orders.create({
            data: {
                order_date: dateTime,
                payment_status: "pending",
                customerId: newCustomer.customer_id
            }
        });

        res.status(201).json({
            message: "Order created successfully",
            customer: newCustomer,
            vehicle: newVehicle,
            order: newOrder
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});


router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true)

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})


//register
router.post("/register", validInfo, async (req, res) => {
    try {
        const {name, email, password, telNumber} = req.body;
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
                user_password: bcryptPassword,
                user_phone_number: telNumber
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


module.exports = router;