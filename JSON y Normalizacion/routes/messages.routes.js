const express = require("express");
const { normalize, schema } = require("normalizr");

const router = express.Router();

const controller = require("../controllers/message");

const schemaAuthor = new schema.Entity("author", {}, { idAttribute: "email" });

const schemaMessage = new schema.Entity(
  "post",
  { author: schemaAuthor },
  { idAttribute: "_id" }
);

const schemaMessages = new schema.Entity(
  "posts",
  {
    messages: [schemaMessage],
  },
  { idAttribute: "id" }
);

router.post("/guardar", async (req, res) => {
  try {
    await controller.create(req.body);

    let messages = await controller.findAll();

    messages = {
      id: "mensaje",
      messages: messages.map((messages) => ({ ...messages._doc })),
    };

    const normalizedData = normalize(messages, schemaMessages);

    const io = req.app.get("io");
    io.emit("messages", normalizedData);

    const value = JSON.stringify(messages).length;

    const data = {
      normalizedData: normalizedData,
      percentage: (
        (JSON.stringify(normalizedData).length / value) *
        100
      ).toFixed(2),
    };

    res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ Message: err.Message, HasErrors: true });
  }
});

router.get("/leer", async (req, res) => {
  try {
    const objs = await controller.findAll();

    res.status(200).json(objs);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
