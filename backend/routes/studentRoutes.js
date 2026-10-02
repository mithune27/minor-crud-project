const express = require("express");

const router = express.Router();

function createStudentRoutes(db) {
  // CREATE
  router.post("/", async (req, res) => {
    const {
      name,
      registerNumber,
      department,
      email,
      phone,
      year
    } = req.body;

    if (
      !name ||
      !registerNumber ||
      !department ||
      !email ||
      !phone ||
      !year
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    try {
      const result = await db.run(
        `
        INSERT INTO students
        (name, register_number, department, email, phone, year)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          name,
          registerNumber,
          department,
          email,
          phone,
          year
        ]
      );

      const student = await db.get(
        "SELECT * FROM students WHERE id = ?",
        result.lastID
      );

      res.status(201).json(student);
    } catch (error) {
      if (error.message.includes("UNIQUE")) {
        return res.status(400).json({
          message: "Register number already exists"
        });
      }

      res.status(500).json({
        message: "Could not add student"
      });
    }
  });

  // READ ALL
  router.get("/", async (req, res) => {
    try {
      const students = await db.all(
        "SELECT * FROM students ORDER BY id DESC"
      );

      res.json(students);
    } catch (error) {
      res.status(500).json({
        message: "Could not fetch students"
      });
    }
  });

  // READ ONE
  router.get("/:id", async (req, res) => {
    try {
      const student = await db.get(
        "SELECT * FROM students WHERE id = ?",
        req.params.id
      );

      if (!student) {
        return res.status(404).json({
          message: "Student not found"
        });
      }

      res.json(student);
    } catch (error) {
      res.status(500).json({
        message: "Could not fetch student"
      });
    }
  });

  // UPDATE
  router.put("/:id", async (req, res) => {
    const {
      name,
      registerNumber,
      department,
      email,
      phone,
      year
    } = req.body;

    if (
      !name ||
      !registerNumber ||
      !department ||
      !email ||
      !phone ||
      !year
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    try {
      const result = await db.run(
        `
        UPDATE students
        SET
          name = ?,
          register_number = ?,
          department = ?,
          email = ?,
          phone = ?,
          year = ?
        WHERE id = ?
        `,
        [
          name,
          registerNumber,
          department,
          email,
          phone,
          year,
          req.params.id
        ]
      );

      if (result.changes === 0) {
        return res.status(404).json({
          message: "Student not found"
        });
      }

      const updatedStudent = await db.get(
        "SELECT * FROM students WHERE id = ?",
        req.params.id
      );

      res.json(updatedStudent);
    } catch (error) {
      if (error.message.includes("UNIQUE")) {
        return res.status(400).json({
          message: "Register number already exists"
        });
      }

      res.status(500).json({
        message: "Could not update student"
      });
    }
  });

  // DELETE
  router.delete("/:id", async (req, res) => {
    try {
      const result = await db.run(
        "DELETE FROM students WHERE id = ?",
        req.params.id
      );

      if (result.changes === 0) {
        return res.status(404).json({
          message: "Student not found"
        });
      }

      res.json({
        message: "Student deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        message: "Could not delete student"
      });
    }
  });

  return router;
}

module.exports = createStudentRoutes;