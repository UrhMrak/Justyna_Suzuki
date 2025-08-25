const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("."));

// Data file paths
const CLASSES_DATA_FILE = "data/classes.json";
const CALENDAR_DATA_FILE = "data/calendar.json";

// Ensure data directory exists
async function ensureDataDirectory() {
  try {
    await fs.mkdir("data", { recursive: true });
  } catch (error) {
    console.log("Data directory already exists or could not be created");
  }
}

// Initialize data files if they don't exist
async function initializeDataFiles() {
  try {
    // Initialize classes data
    try {
      await fs.access(CLASSES_DATA_FILE);
    } catch {
      const defaultClasses = [
        {
          id: "1",
          title: "Suzuki Class 1",
          date: "Saturday 11th of October",
          time: "9:00 - 10:00",
          location: "Allegro Suzuki Music School",
          description:
            "This is a class for children with parents. Everyone is welcome to join.",
        },
        {
          id: "2",
          title: "Suzuki Class 2",
          date: "Saturday 11th of October",
          time: "10:15 - 11:15",
          location: "Allegro Suzuki Music School",
          description:
            "This is a class for children with parents. Everyone is welcome to join.",
        },
      ];
      await fs.writeFile(
        CLASSES_DATA_FILE,
        JSON.stringify(defaultClasses, null, 2)
      );
    }

    // Initialize calendar data
    try {
      await fs.access(CALENDAR_DATA_FILE);
    } catch {
      const defaultCalendar = {};
      await fs.writeFile(
        CALENDAR_DATA_FILE,
        JSON.stringify(defaultCalendar, null, 2)
      );
    }
  } catch (error) {
    console.error("Error initializing data files:", error);
  }
}

// API Routes

// Get all classes
app.get("/api/classes", async (req, res) => {
  try {
    const data = await fs.readFile(CLASSES_DATA_FILE, "utf8");
    const classes = JSON.parse(data);
    res.json(classes);
  } catch (error) {
    console.error("Error reading classes:", error);
    res.status(500).json({ error: "Failed to read classes data" });
  }
});

// Save all classes
app.post("/api/classes", async (req, res) => {
  try {
    const classes = req.body;
    await fs.writeFile(CLASSES_DATA_FILE, JSON.stringify(classes, null, 2));
    res.json({ message: "Classes saved successfully" });
  } catch (error) {
    console.error("Error saving classes:", error);
    res.status(500).json({ error: "Failed to save classes data" });
  }
});

// Get calendar data
app.get("/api/calendar", async (req, res) => {
  try {
    const data = await fs.readFile(CALENDAR_DATA_FILE, "utf8");
    const calendar = JSON.parse(data);
    res.json(calendar);
  } catch (error) {
    console.error("Error reading calendar:", error);
    res.status(500).json({ error: "Failed to read calendar data" });
  }
});

// Save calendar data
app.post("/api/calendar", async (req, res) => {
  try {
    const calendar = req.body;
    await fs.writeFile(CALENDAR_DATA_FILE, JSON.stringify(calendar, null, 2));
    res.json({ message: "Calendar saved successfully" });
  } catch (error) {
    console.error("Error saving calendar:", error);
    res.status(500).json({ error: "Failed to save calendar data" });
  }
});

// Start server
async function startServer() {
  await ensureDataDirectory();
  await initializeDataFiles();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
  });
}

startServer().catch(console.error);
