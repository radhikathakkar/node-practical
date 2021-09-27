const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const auth = require("./routes/auth");
const blog = require("./routes/blog");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
  },
  (err, res) => {
    if (err) {
      console.log("err =", err);
    }
    console.log("successfully connected");
  }
);

app.use(cors());

app.use(express.json());
app.use("/auth", auth);
app.use("/blog", blog);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on port = ${port}`);
});
