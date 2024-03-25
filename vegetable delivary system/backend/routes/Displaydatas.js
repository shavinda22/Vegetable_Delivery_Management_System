const router = require("express").Router();
let vegetable = require("../models/Displaydata.js");

router.post("/add", async (req, res) => {
  try {
    const { name, price, image } = req.body;

    const newvegetable = new vegetable({
      name,
      price,
      image,
    });

    await newvegetable.save();
    res.status(201).json(newvegetable);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.route("/").get(async (req, res) => {
  try {
    const vegetables = await vegetable.find();
    res.json(vegetables);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});



router.route("/delete/:id").delete(async (req, res) => {
  let vegetableId = req.params.id;

  const deletestudent = await vegetable
    .findByIdAndDelete(vegetableId)
    .then(() => {
      res.status(200).send({ congradulation: "vegetable deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/search").get(async (req, res) => {
  try {
    const query = req.query.query;
    const vegetables = await vegetable.find({
      name: { $regex: query, $options: "i" },
    });
    res.json(vegetables);
  } catch (error) {
    console.error("Error searching vegetables:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



router.route("/update/:id").put(async (req, res) => {
  const vegetableId = req.params.id;
  const updatedvegetable = req.body;

  try {
    const vegetables = await vegetable.findByIdAndUpdate(
      vegetableId,
      updatedvegetable,
      { new: true }
    );

    if (!vegetables) {
      return res.status(404).json({ message: "vegetable not found" });
    }

    return res
      .status(200)
      .json({ message: "vegetable updated successfully", vegetables });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
