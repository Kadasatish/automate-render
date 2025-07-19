import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors()); // ✅ Allow frontend to access backend
app.use(express.json());

// Base path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_FILE = path.join(__dirname, "sms_logs.txt");

// ✅ POST /sms → save SMS
app.post("/sms", (req, res) => {
  const sms = `[${new Date().toISOString()}] ${JSON.stringify(req.body)}\n`;
  fs.appendFile(LOG_FILE, sms, (err) => {
    if (err) {
      console.error("❌ Error writing:", err);
      return res.status(500).send("Error saving SMS");
    }
    console.log("📩 SMS Saved:", req.body);
    res.status(200).send("SMS saved!");
  });
});

// ✅ GET /logs → read SMS log file
app.get("/logs", (req, res) => {
  fs.readFile(LOG_FILE, "utf-8", (err, data) => {
    if (err) {
      console.error("❌ Error reading:", err);
      return res.status(500).send("Error reading logs");
    }
    res.type("text/plain").send(data);
  });
});

// ✅ GET /
app.get("/", (req, res) => {
  res.send("📡 SMS Receiver running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
