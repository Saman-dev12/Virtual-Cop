import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.status(200).end(`<h1>Hey There</h1>`);
});

app.listen(PORT, () => console.log("Server started at port", PORT));
