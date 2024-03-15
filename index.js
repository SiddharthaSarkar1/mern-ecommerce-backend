const express = require("express");
const server = express();
const mongoose = require("mongoose");
const { createProduct } = require("./controller/Product");
require("dotenv").config();
const cors = require("cors");

const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Categoreis");
const brandsRouter = require("./routes/Brands");

const PORT = 5050;

//Middlewares
server.use(cors());
server.use(express.json()); //to parse req.body
server.use('/products', productsRouter.router);
server.use('/categories', categoriesRouter.router);
server.use('/brands', brandsRouter.router);

// MongoDB connection
main();

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "sidd_ecommerce",
    });
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
}

server.get("/", (req, res) => {
  res.json({ status: "Success" });
});

server.post("/products", createProduct);

server.listen(PORT, () => {
  `Server is running on port: ${PORT}`;
});
