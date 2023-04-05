const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreenBright("Note was added"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, "utf-8");
  const result = JSON.parse(notes);
  return Array.isArray(result) ? result : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id), chalk.blue(note.title));
  });
}

async function removeNoteById(id) {
  const notes = await getNotes();
  const newNotes = notes.filter((note) => note.id !== id.toString());
  await fs.writeFile(notesPath, JSON.stringify(newNotes));
  console.log(chalk.red.inverse("Note was removed"));
}

async function updateNote(data) {
  const notes = await getNotes();
  const newNotes = notes.map((note) => {
    if (note.id === data.id.toString()) return data;
    return note;
  });
  await fs.writeFile(notesPath, JSON.stringify(newNotes));
  console.log(chalk.blue.inverse("Note was updated"));
}

module.exports = {
  addNote,
  getNotes,
  removeNoteById,
  updateNote,
};
