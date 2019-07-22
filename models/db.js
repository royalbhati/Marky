const mongoose = require("mongoose");
const url =
  "mongodb+srv://royal:royal123@cluster0-uo6jd.mongodb.net/test?retryWrites=true";
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => console.log("connected"))
  .catch(err => console.log(err));
