import { queryDatabase } from "./src/utils/postgres.js";
import cors from "cors";
import express from "express";

const app = express();
const port = 8080;
const err500 = "Something went wrong on the server!";
const err400_1 = "All fields are required!";
const err400_2 = "The maximum amount of tickets (3) have already been purchased for this Vatin (OIB)!";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Access-Control-Allow-Headers"],
  })
);

app.get("/api/user", async (req, res) => {
  try {
    const query = 'SELECT * FROM "user"';
    const data = await queryDatabase(query);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err500, details: err.message });
  }
});

app.get("/api/ticket", async (req, res) => {
  try {
    const query = "SELECT * FROM ticket";
    const data = await queryDatabase(query);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err500, details: err.message });
  }
});

app.get("/api/ticket/:id", async (req, res) => {
  try {
    const ticketId = req.params.id;
    const query = "SELECT * FROM ticket WHERE id = $1";
    const data = await queryDatabase(query, [ticketId]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err500, details: err.message });
  }
});

app.post("/api/ticket", async (req, res) => {
  try {
    const { vatin, firstName, lastName } = req.body;

    if (!vatin || !firstName || !lastName) {
      res.status(400).json({ error: err400_1 });
      return;
    }

    const getQuery = "SELECT * FROM ticket WHERE vatin = $1";
    const tickets = await queryDatabase(getQuery, [vatin]);
    if (tickets.length >= 3) {
      res.status(400).json({ error: err400_2 });
      return;
    }

    const query =
      'INSERT INTO ticket ("vatin", "firstName", "lastName", "created") VALUES ($1, $2, $3, $4) RETURNING "id"';
    const data = await queryDatabase(query, [vatin, firstName, lastName, new Date()]);

    res.status(200).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err500, details: err.message });
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
