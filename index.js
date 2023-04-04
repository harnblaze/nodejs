const chalk = require("chalk");
const express = require("express");
const { addNote, getNotes } = require("./notes.controller");

port = 3001;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}`));
});
