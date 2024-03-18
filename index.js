const express = require("express");
const server = express();
const mongoose = require("mongoose");
const { createProduct } = require("./controller/Product");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Categoreis");
const brandsRouter = require("./routes/Brands");
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");
const { User } = require("./model/User");

const PORT = 5050;

//Middlewares
server.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
server.use(passport.authenticate("session"));
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json()); //to parse req.body
server.use("/products", productsRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/brands", brandsRouter.router);
server.use("/users", usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", ordersRouter.router);

// Passport Strategies
passport.use(
  "local",
  new LocalStrategy(async function (username, password, done) {
    // by default passport uses username
    try {
      const user = await User.findOne({ email: username }).exec();
      console.log(username, password, user);
      console.log(user.password, password);
      if (!user) {
        return done(null, false, { message: "invalid credentials" }); // for safety
      } else if (user.password === password) {
        return done(null, user);
      } else {
        return done(null, false, { message: "invalid credentials" });
      }
    } catch (err) {
      done(err);
    }
  })
);

// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  console.log("serialize", user);
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

// this changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {
  console.log("de-serialize", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

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

// server.post("/products", createProduct);

server.listen(PORT, () => {
  `Server is running on port: ${PORT}`;
});
