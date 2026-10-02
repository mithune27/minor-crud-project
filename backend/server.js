const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDatabase = require("./database/database");
const createStudentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    message: "Student CRUD API is running"
  });
});

async function startServer() {
  try {
    const db = await connectDatabase();

    app.use(
      "/api/students",
      createStudentRoutes(db)
    );

    const frontendPath = path.join(
      __dirname,
      "../frontend/dist"
    );

    app.use(express.static(frontendPath));

    app.get("*", (req, res) => {
      res.sendFile(
        path.join(frontendPath, "index.html")
      );
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Failed to start server:",
      error.message
    );
  }
}

startServer();