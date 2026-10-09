
import fs from "node:fs/promises";

const fileName = "notes.txt";

async function createNote(content) {
    try {
        await fs.writeFile(fileName, content, { flag: "wx" });
        console.log("Note created successfully!");
    } catch (error) {
        if (error.code === "EEXIST") {
            console.log("The note already exists. Use another filename or read the existing note.");
        } else {
            console.error("Could not create the note:", error.message);
        }
    }
}

async function readNote() {
    try {
        const content = await fs.readFile(fileName, "utf8");
        console.log("\n--- NOTE CONTENT ---");
        console.log(content);
    } catch (error) {
        if (error.code === "ENOENT") {
            console.log("Note not found. Create it first.");
        } else {
            console.error("Could not read the note:", error.message);
        }
    }
}

async function deleteNote() {
    try {
        await fs.unlink(fileName);
        console.log("Note deleted successfully!");
    } catch (error) {
        if (error.code === "ENOENT") {
            console.log("Cannot delete: the note does not exist.");
        } else {
            console.error("Could not delete the note:", error.message);
        }
    }
}

async function main() {
    const command = process.argv[2];
    const content = process.argv.slice(3).join(" ");

    if (command === "create") {
        if (!content.trim()) {
            console.log('Usage: npm start -- create "Your note"');
            return;
        }

        await createNote(content);
    } else if (command === "read") {
        await readNote();
    } else if (command === "delete") {
        await deleteNote();
    } else {
        console.log("Safe File Manager");
        console.log('Create: npm start -- create "Your note"');
        console.log("Read:   npm start -- read");
        console.log("Delete: npm start -- delete");
    }
}

main().catch((error) => {
    console.error("Unexpected application error:", error.message);
    process.exitCode = 1;
});