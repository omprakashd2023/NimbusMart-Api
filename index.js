const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const PORT = 3000;

//MONGODB CREDENTIALS
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_DATABASE = process.env.MONGODB_DATABASE;

const MONGO_DB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.agxcvyt.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

//Routes
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const productRouter = require("./routes/product");

const app = express();

app.use(express.json());
app.use(cors());

//Connect to DB
mongoose
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

//Auth Routes
app.use("/api", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/product", productRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at PORT:${PORT}`);
});
