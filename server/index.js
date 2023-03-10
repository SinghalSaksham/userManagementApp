import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import adRoutes from "./routes/ad.js";
import connectDB from "./mongodb/connect.js";

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));

app.use(cors());

app.use("/user", userRoutes);
app.use("/ad", adRoutes);

// app.get("/", (req, res) => {
//   res.send({ message: "Hello World!" });
// });

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL);

    app.listen(process.env.PORT, () =>
      console.log(`Server started on port http://localhost:${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
