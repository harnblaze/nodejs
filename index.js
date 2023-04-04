const chalk = require("chalk");
const express = require("express");
const path = require("path");
const { addNote } = require("./notes.controller");

port = 3001;

const basePath = path.join(__dirname, "pages");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(basePath, "index.html"));
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.sendFile(path.join(basePath, "index.html"));
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}`));
});
