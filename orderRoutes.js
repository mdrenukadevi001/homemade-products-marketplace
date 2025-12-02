
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
