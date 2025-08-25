const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("."));

// Vercel KV setup
let kv = null;

// Initialize KV if available (in production)
if (process.env.KV_URL) {
  try {
    const { createClient } = require("@vercel/kv");
    kv = createClient({
      url: process.env.KV_URL,
      token: process.env.KV_REST_API_TOKEN,
    });
    console.log("Vercel KV connected successfully");
  } catch (error) {
    console.log("Vercel KV not available, using fallback storage");
  }
}

// Fallback storage for development
let fallbackStorage = {
  classes: [
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
  ],
  calendar: {},
};

// Helper functions for data storage
async function getData(key) {
  if (kv) {
    try {
      const value = await kv.get(key);
      return value || null;
    } catch (error) {
      console.error("Error reading from KV:", error);
      return null;
    }
  } else {
    // Fallback to in-memory storage
    return fallbackStorage[key] || null;
  }
}

async function setData(key, value) {
  if (kv) {
    try {
      await kv.set(key, value);
      return true;
    } catch (error) {
      console.error("Error writing to KV:", error);
      return false;
    }
  } else {
    // Fallback to in-memory storage
    fallbackStorage[key] = value;
    return true;
  }
}

// API Routes

// Get all classes
app.get("/api/classes", async (req, res) => {
  try {
    const classes = await getData("classes");
    if (classes === null) {
      // Initialize with default data if none exists
      await setData("classes", fallbackStorage.classes);
      res.json(fallbackStorage.classes);
    } else {
      res.json(classes);
    }
  } catch (error) {
    console.error("Error reading classes:", error);
    res.status(500).json({ error: "Failed to read classes data" });
  }
});

// Save all classes
app.post("/api/classes", async (req, res) => {
  try {
    const classes = req.body;
    const success = await setData("classes", classes);
    if (success) {
      res.json({ message: "Classes saved successfully" });
    } else {
      res.status(500).json({ error: "Failed to save classes" });
    }
  } catch (error) {
    console.error("Error saving classes:", error);
    res.status(500).json({ error: "Failed to save classes data" });
  }
});

// Get calendar data
app.get("/api/calendar", async (req, res) => {
  try {
    const calendar = await getData("calendar");
    if (calendar === null) {
      // Initialize with empty calendar if none exists
      await setData("calendar", {});
      res.json({});
    } else {
      res.json(calendar);
    }
  } catch (error) {
    console.error("Error reading calendar:", error);
    res.status(500).json({ error: "Failed to read calendar data" });
  }
});

// Save calendar data
app.post("/api/calendar", async (req, res) => {
  try {
    const calendar = req.body;
    const success = await setData("calendar", calendar);
    if (success) {
      res.json({ message: "Calendar saved successfully" });
    } else {
      res.status(500).json({ error: "Failed to save calendar" });
    }
  } catch (error) {
    console.error("Error saving calendar:", error);
    res.status(500).json({ error: "Failed to save calendar data" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    storage: kv ? "Vercel KV" : "Fallback Storage",
    timestamp: new Date().toISOString(),
  });
});

// Serve static files
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// For Vercel serverless
if (process.env.NODE_ENV === "production") {
  // Export for Vercel
  module.exports = app;
} else {
  // Local development
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
    console.log(`Storage: ${kv ? "Vercel KV" : "Fallback Storage"}`);
  });
}
