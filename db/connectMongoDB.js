const mongoose = require("mongoose");

const connectMongoDB = async () =>  {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "sidd_ecommerce",
    });
    // console.log("database connected");
    console.log(`MongoDB database connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connection to mongoDB: ${error.message}`);
  }
}

module.exports = connectMongoDB;