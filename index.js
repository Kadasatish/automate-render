import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Base dir setup for ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_FILE = path.join(__dirname, "sms_logs.txt");

// POST route - Save SMS to file
app.post("/sms", (req, res) => {
  const sms = `[${new Date().toISOString()}] ${JSON.stringify(req.body)}\n`;
  fs.appendFile(LOG_FILE, sms, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
      return res.status(500).send("Error saving SMS");
    }
    console.log("📩 SMS RECEIVED & SAVED >>>", req.body);
    res.status(200).send("SMS saved!");
  });
});

// GET route - Return SMS logs
app.get("/logs", (req, res) => {
  fs.readFile(LOG_FILE, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading SMS logs");
    }
    res.send(data);
  });
});

// Home route
app.get("/", (req, res) => {
  res.send("📡 SMS Receiver is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
