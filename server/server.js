const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const validInfo = require("./middleware/validInfo.js");

const { PrismaClient } = require('@prisma/client')

const app = express();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: 'src/uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

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
      orders = await db.Orders.findMany({
        include: {
          customer: true,
        },
      });
    } else if (user_type === "USER" && user_id) {
      orders = await db.Orders.findMany({
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
    const results = await db.Users.findMany();
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

app.put("/updateUser", upload.single('user_photo'), validInfo, async (req, res) => {
  try {
    const tokenData = req.header("token");
    const decodedToken = jwt.decode(tokenData);
    const user_id = decodedToken.user;

    const photo = req.body;

    const user = await db.Users.findUnique({
      where: {
        user_id: user_id,
      },
    });

    const updatedUser = await db.Users.update({
      where: {
        user_id: user_id,
      },
      data: {
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_phone_number: req.body.user_phone_number,
      }
    });

    const uploadedPhoto = await db.Photos.create({
      data: {
        photo_path: photo.user_photo,

      }
    });


    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
});

app.get("/getUserPhoto", async (req, res) => {
  try {
    const tokenData = req.header("token");
    const decodedToken = jwt.decode(tokenData);
    const user_id = decodedToken.user;

    const user = await db.Users.findUnique({
      where: {
        user_id: user_id,
      },
    });

    res.set("Content-Type", "image/jpeg"); // Or the photo format you are using.
    res.send(user.user_photo);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving user photo" });
    console.error(err);
  }
});

app.get("/getUser", async (req, res) => {
  try {
    
    const tokenData = req.header("token");
    const decodedToken = jwt.decode(tokenData);
    const user_id = decodedToken.user;

    const user = await db.Users.findUnique({
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

    const user = await db.Users.findUnique({
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

    const user = await db.Users.findUnique({
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
    const updatedOrder = await db.Customers.update({
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

// app.delete("/deleteOrder", async (req, res) => {
//   try {
//     console.log(req.headers.order_id);

//     const deletedOrder = await db.Orders.delete({
//       where: {
//         order_id: req.headers.order_id,
//       },
//     });
//     res.status(200).json(deletedOrder);
//   } catch (err) {
//     console.log(err);
//   }
// });

app.delete("/deleteOrder", async (req, res) => {
  try {
    console.log(req.headers.order_id);

    // First, delete related records from the OrderPackage table
    await db.OrderPackage.deleteMany({
      where: {
        orderId: req.headers.order_id,
      },
    });

    // Now, delete the order
    const deletedOrder = await db.Orders.delete({
      where: {
        order_id: req.headers.order_id,
      },
    });
    res.status(200).json(deletedOrder);
  } catch (err) {
    console.log(err);
  }
});

//create something
app.post("/api/v1/orders", async (req, res) => {
  try {
    const results = await db.Users.create({
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
    const results = await db.Users.update({
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
    const results = await db.Users.delete({
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

    const order = await prisma.Orders.findMany({
      include: { customer: true, },
    });
    const vehicle = await prisma.Vehicles.findMany({
      include: { customer: true, },
    });
    const user = await prisma.Users.findMany({
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

app.get('/dataPdf', async (req, res) => {
  try {
    const users = await db.Users.findMany();
    const data = users;
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('An error occurred while fetching data');
  }
});

app.get('/getPackages', async (req, res) => {
  try {
    const packages = await db.Packages.findMany();
    // console.log(packages);
    const data = packages;
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('An error occurred while fetching data');
  }
});

app.post('/updatePackage', async (req, res) => {
  try {
    // console.log(req.body);
    const updatedPackage = await db.Packages.update({
      where: {
        package_id: req.body.package_id,
      },
      data: {
        package_name: req.body.package_name,
        package_description: req.body.package_description,
        package_price: req.body.package_price,
      },
    });
    res.status(200).json(updatedPackage);
  } catch (err) {
    console.log(err);
  }
});

app.delete('/deletePackage', async (req, res) => {
  try {
    // console.log(req.body);
    const deletedPackage = await db.Packages.delete({
      where: {
        package_id: req.headers.package_id,
      },
    });
    res.status(200).json(deletedPackage);
  } catch (err) {
    console.log(err);
  }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is up listening on port ${PORT}`);
});
