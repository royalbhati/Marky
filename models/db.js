const mongoose = require("mongoose");
const url = process.env.MONGO_URL;
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => console.log("connected"))
  .catch(() => console.log(err));
