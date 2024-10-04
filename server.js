import { queryDatabase } from "./src/utils/postgres.js";
import cors from "cors";
import express from "express";

const app = express();
const port = 8080;
const err500 = "Something went wrong on the server!";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Access-Control-Allow-Headers"],
  })
);

app.get("/api/test", async (req, res) => {
  try {
    const query = "SELECT * FROM test";
    const data = await queryDatabase(query);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err500, details: err.message });
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
