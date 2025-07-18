import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/sms", (req, res) => {
  console.log("📩 SMS RECEIVED >>>", req.body);
  res.status(200).send("SMS received!");
});

app.get("/", (req, res) => {
  res.send("SMS Receiver is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
