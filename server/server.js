const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const validInfo = require("./middleware/validInfo.js");

const { PrismaClient } = require('@prisma/client')

const app = express();

//middleware
app.use(cors());
app.use(express.json()); //to retrieve information from the body of the POST request

//register and login routes
app.use("/auth", require("./routes/jwtAuth.js"));

//dashboard route
app.use("/dashboard", require("./routes/dashboard.js"));

//get orders
app.get("/getOrders", async (req, res) => {
  const user_type = req.headers.user_type;
  const user_id = req.headers.user_id;

  try {
    let orders = [];

    if (user_type === "ADMIN") {
      orders = await db.orders.findMany({
        include: {
          customer: true,
        },
      });
    } else if (user_type === "USER" && user_id) {
      orders = await db.orders.findMany({
        where: {
          customer: {
            customer_userId: user_id,
          },
        },
        include: {
          customer: true,
        },
      });
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
});

//get all something
app.get("/api/v1/orders", async (req, res) => {
  try {
    const results = await db.users.findMany();
    res.status(200).json({
      status: "success",
      results: results.length,
      data: {
        orders: results,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/updateUser", validInfo, async (req, res) => {
  try {
    const tokenData = req.header("token");
    const decodedToken = jwt.decode(tokenData);
    const user_id = decodedToken.user;

    const user = await db.users.findUnique({
      where: {
        user_id: user_id,
      },
    });

    const updatedUser = await db.users.update({
      where: {
        user_id: user_id,
      },
      data: {
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_phone_number: req.body.user_phone_number,
      },
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
});

app.get("/getUser", async (req, res) => {
  try {
    
    const tokenData = req.header("token");
    const decodedToken = jwt.decode(tokenData);
    const user_id = decodedToken.user;

    const user = await db.users.findUnique({
      where: {
        user_id: user_id,
      },
    });

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.get("/role", async (req, res) => {
  try {

    const tokenData = req.header("token");
    const decodedToken = jwt.decode(tokenData);
    const user_id = decodedToken.user;

    const user = await db.users.findUnique({
      where: {
        user_id: user_id,
      },
    });
    res.status(200).json(user?.user_type);
  } catch (err) {
    console.log(err);
  }
});

app.get("/username", async (req, res) => {
  try {
    const tokenData = req.header("token");
    const decodedToken = jwt.decode(tokenData);
    const user_id = decodedToken.user;

    const user = await db.users.findUnique({
      where: {
        user_id: user_id,
      },
    });

    res.status(200).json(user?.user_name);

  } catch (err) {
    console.log(err);
  }
});

app.post("/updateOrder", async (req, res) => {
  try {
    const updatedOrder = await db.customers.update({
      where: {
        customer_id: req.body.customer_id,
      },
      data: {
        customer_first_name: req.body.customer_first_name,
        customer_last_name: req.body.customer_last_name,
      },
    });
    res.status(200).json(updatedOrder);
  } catch (err) {
    console.log(err);
  }
});

//create something
app.post("/api/v1/orders", async (req, res) => {
  try {
    const results = await db.users.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        orders: results,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//update something
app.put("/api/v1/orders/:order_id", async (req, res) => {
  try {
    const results = await db.users.update({
      where: {
        id: parseInt(req.params.order_id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    });

    console.log(results);

    res.status(200).json({
      status: "success",
      data: {
        orders: results,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//delete something
app.delete("/api/v1/orders/:order_id", async (req, res) => {
  try {
    const results = await db.users.delete({
      where: {
        id: parseInt(req.params.order_id),
      },
    });

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/dataJson', async (req, res) => {
  try {    
    const prisma = new PrismaClient();

    const order = await prisma.orders.findMany({
      include: { customer: true, },
    });
    const vehicle = await prisma.vehicles.findMany({
      include: { customer: true, },
    });
    const user = await prisma.users.findMany({
    });

    const data = {
      order,
      vehicle,
      user,
    };
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('An error occurred while fetching data');
  }
});

app.get('/dataJson', async (req, res) => {
  try {
    const albums = await db.album.findMany({
      include: { songs: true, Artist: true },
    });
    const songs = await db.song.findMany({
      include: { Album: true, Artist: true},
    });
    const artists = await db.artist.findMany({
      include: { songs: true, albums: true },
    });

    const data = {
      albums,
      songs,
      artists,
    };
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('An error occurred while fetching data');
  }
});

app.get('/dataPdf', async (req, res) => {
  try {
    const users = await db.users.findMany();
    const data = users;
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('An error occurred while fetching data');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is up listening on port ${PORT}`);
});
