const express = require("express");
const router = express.Router();
const { fork } = require("child_process");

const dotenv = require("dotenv");

dotenv.config();

router.get("/:cant", async (req, res) => {
  try {
    let quantity = process.env.RANDOM_DEFAULT;
    if (req.params.cant && !isNaN(req.params.cant)) {
      quantity = Number(req.params.cant);
    }

    const random = fork("./random.js");
    random.send(20000000);
    random.on("random", (data) => {
      console.log(data);
      res.send(`Cantidades ${data}`);
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.get("/:cant", async (req, res) => {
  try {
    let quantity = process.env.RANDOM_DEFAULT;
    if (req.params.cant && !isNaN(req.params.cant)) {
      quantity = Number(req.params.cant);
    }

    const random = fork("random.js");
    random.send(quantity);
    random.on("random", (data) => {
      console.log(data);
      res.send(`Cantidades ${data}`);
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
