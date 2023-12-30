import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Err:", error);
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`app is running on Port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(`MongoDB connection failed !!! ${err}`));

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//   } catch (error) {
//     console.error("Error:", error);
//     throw error;
//   }
// })();
