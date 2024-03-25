const router = require("express").Router();
let order = require("../models/Order.js");

router.route("/place-order").post(async (req, res) => {
  try {
    const { customerDetails, cartItems } = req.body;

    console.log("Received order request:", { customerDetails, cartItems });

    const newOrder = new order({
      customerDetails,
      items: cartItems,
    });

    await newOrder.save();

    console.log("Order placed successfully");

    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.route("/details").get(async (req, res) => {
  try {
    const orders = await order.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
