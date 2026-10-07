
import fs from "node:fs";
const fileName = "notes.txt";
const firstNote = "Learning Node.js File System";
fs.writeFileSync(fileName, firstNote);
console.log("Notes file created!");
fs.appendFileSync(fileName, "\nBuilding backend projects with Node.js");
fs.appendFileSync(fileName, "\nDay 3 of my 90-day backend journey");
const notes = fs.readFileSync(fileName, "utf8");
console.log("\n--- MY NOTES ---");
console.log(notes);