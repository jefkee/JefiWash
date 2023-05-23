const jwt = require("jsonwebtoken")
require("dotenv").config();
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const db = require("./db")

const app = express()

//middleware


app.use(cors())
app.use(express.json()) //to retrieve information from the body of the POST request

//register and login routes
app.use("/auth", require("./routes/jwtAuth.js"))

//dashboard route
app.use("/dashboard", require("./routes/dashboard.js"))

//get all something
app.get("/api/v1/orders", async (req, res) => {
    
    try {
        const results = await db.users.findMany()
        // console.log(results)
            res.status(200).json({
            status: "success",
            results: results.length,
            data: {
                orders: results
            }
        })
    }   catch (err) {
        console.log(err)
    }

})

//get something by id
// app.get("/api/v1/orders/:order_id", async (req, res) => {
//     console.log(req.params.order_id)
    
//     try{
//         const results = await db.users.findUnique({
//             where: {
//                 id: parseInt(req.params.order_id)
//             }
//         });

//         res.status(200).json({
//             status: "success",
//             data: {
//                 orders: results
//             }
//         })

//     } catch (err) {
//          console.log(err)
//     }


// })

app.get("/username", async (req, res) => {

    try{
        // console.log(req)
        const tokenData = req.header("token")
        // console.log(tokenData)
        const decodedToken = jwt.decode(tokenData)
        // console.log(decodedToken)
        const user_id = decodedToken.user
        // console.log(user_id)
        const user = await db.users.findUnique({
            where: {
                user_id: user_id,
            },
        }
        )
        // console.log(user)
        res.status(200).json(user?.user_name)
        // const results = await findByID(tokenData)
        // console.log(results)
        // res.status(200).json(results?.user_name)

    } catch (err) {
        console.log(err)
    }
})

//create something
app.post("/api/v1/orders", async (req, res) => {
    // console.log(req.body)

try {
    const results = await db.users.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    })

    // console.log(results)

    res.status(201).json({
        status: "success",
        data: {
            orders: results
        }
    });

}   catch (err) {
    console.log(err)
}


})

//update something
app.put("/api/v1/orders/:order_id", async (req, res) => {
    try{
        const results = await db.users.update({
            where: {
                id: parseInt(req.params.order_id)
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            },
        })

        console.log(results)

        res.status(200).json({
            status: "success",
            data: {
                orders: results
            }
        })

    }   catch (err) {
        console.log(err)
    }
    
    // console.log(req.params.order_id)
    // console.log(req.body)


})

//delete something
app.delete("/api/v1/orders/:order_id", async (req, res) => {
    
    try{
        const results = await db.users.delete({
            where: {
                id: parseInt(req.params.order_id)
            }
        })

        res.status(204).json({
            status: "success"
        })
            
    }   catch (err) {
        console.log(err)
    }
})



const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is up listening on port ${PORT}`)
})

