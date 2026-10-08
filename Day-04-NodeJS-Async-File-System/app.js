import fs from "node:fs/promises";

const fileName = "tasks.json";

const initialTasks = [
    {
        id: 1,
        title: "Learn Node.js",
        completed: false
    },
    {
        id: 2,
        title: "Build backend project",
        completed: false
    }
];

async function createTasksFile() {
    try {
        await fs.access(fileName);
        console.log("tasks.json already exists.");
    } catch {
        await fs.writeFile(
            fileName,
            JSON.stringify(initialTasks, null, 2)
        );

        console.log("tasks.json created successfully!");
    }
}

async function readTasks() {
    const data = await fs.readFile(fileName, "utf8");
    return JSON.parse(data);
}

async function addTask(title) {
    const tasks = await readTasks();

    const newTask = {
        id: tasks.length + 1,
        title: title,
        completed: false
    };

    tasks.push(newTask);

    await fs.writeFile(
        fileName,
        JSON.stringify(tasks, null, 2)
    );

    console.log("Task added successfully!");
}

async function completeTask(id) {
    const tasks = await readTasks();

    const task = tasks.find(task => task.id === id);

    if (!task) {
        console.log("Task not found.");
        return;
    }

    task.completed = true;

    await fs.writeFile(
        fileName,
        JSON.stringify(tasks, null, 2)
    );

    console.log("Task completed successfully!");
}

async function showTasks() {
    const tasks = await readTasks();

    console.log("\n===== TASKS =====");

    tasks.forEach(task => {
        const status = task.completed ? "✓" : " ";

        console.log(
            `${task.id}. [${status}] ${task.title}`
        );
    });
}

async function main() {
    await createTasksFile();

    await addTask("Practice asynchronous Node.js");

    await completeTask(1);

    await showTasks();
}

main();