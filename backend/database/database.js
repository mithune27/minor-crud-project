const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function connectDatabase() {
  const db = await open({
    filename: "./database/students.db",
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      register_number TEXT NOT NULL UNIQUE,
      department TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      year INTEGER NOT NULL
    )
  `);

  return db;
}

module.exports = connectDatabase;