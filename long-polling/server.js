const express = require("express");
const cors = require("cors");
const EventEmitter = require("node:events");

const emitter = new EventEmitter();
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/get-messages", (req, res) => {
  emitter.once("newMessage", (message) => {
    res.json(message);
  });
});
app.post("/new-messages", (req, res) => {
  const message = req.body;
  emitter.emit("newMessage", message);
  res.status(200);
});

app.listen(8080, () => console.log(`server started on port ${PORT}`));
