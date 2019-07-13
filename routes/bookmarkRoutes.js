const express = require("express");
const router = express.Router();
const bookmark = require("../models/Bookmark");
const getToken = require("./utils");
require("../models/db");

router.post("/api/", (req, res) => {
  console.log("body", req.body);
  if (req.body.token) {
    const new_b = new bookmark({
      token: req.body.token,
      name: req.body.name,
      url: req.body.url,
      category: req.body.category
    });
    new_b
      .save()
      .then(() => res.send("posted"))
      .catch(err => console.log(err));
  }
});

router.get("/api/:token", (req, res) => {
  const token = req.params.token;
  console.log(req.params);
  bookmark.find({ token }).then(resp => {
    res.send(resp);
  });
});

router.get("/api/category/:token/:category", (req, res) => {
  bookmark.deleteMany(
    {
      token: req.params.token,
      category: req.params.category
    },
    (err, result) => {
      if (err) {
        throw new Error();
      }
      res.json({ result });
    }
  );
});

router.get("/api/delete/single/:id", (req, res) => {
  console.log("delete single",req.params.id);
  
  bookmark.findByIdAndDelete(
    {
      _id: req.params.id
    },
    (err, result) => {
      if (err) {
        throw new Error();
      }
      res.json({ result });
    }
  );
});

module.exports = router;
