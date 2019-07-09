const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;
var path = require("path");
//DB

const bookmarkRoutes = require("./routes/bookmarkRoutes");

const app = express();
//Static file declaration
app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());
app.use(cors());

app.use("/", bookmarkRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  //
  app.get("*", (req, res) => {
    res.sendfile(path.join((__dirname = "client/build/index.html")));
  });
}
//server
app.listen(port, () => {
  console.log("server started");
});
