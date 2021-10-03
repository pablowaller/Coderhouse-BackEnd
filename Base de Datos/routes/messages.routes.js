const express = require("express");
const router = express.Router();

const Message = require("../api/message");

const MessageRepository = require("../repository/message-repository/message-repository");

const messageRepository = new MessageRepository("messages");

router.post("/guardar", async (req, res) => {
  const message = new Message(req.body.email, req.body.message, req.body.date);

  try {
    await messageRepository.new(message);

    const messages = await messageRepository.get();

    const io = req.app.get("io");
    io.emit("messages", messages);

    return res.status(200).json(messages);
  } catch (err) {
    return res.status(400).json({ Message: err.Message, HasErrors: true });
  }
});

router.get("/leer", async (req, res) => {
  const objs = await messageRepository.get();

  res.status(200).json(objs);
});

module.exports = router;
