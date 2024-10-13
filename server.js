import { queryDatabase } from "./src/utils/postgres.js";
import cors from "cors";
import express from "express";
import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 8080;

const err500 = "Something went wrong on the server!";
const err400_1 = "All fields are required!";
const err400_2 = "The maximum amount of tickets (3) have already been purchased for this Vatin (OIB)!";

const jwtCheck = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://goroz.eu.auth0.com/.well-known/jwks.json`,
  }),
  audience: "http://localhost:5173/",
  issuer: `https://goroz.eu.auth0.com/`,
  algorithms: ["RS256"],
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Headers"],
  })
);

app.post("/api/get-token", async (req, res) => {
  try {
    const response = await fetch("https://goroz.eu.auth0.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        audience: "http://localhost:5173/",
      }),
    });

    const data = await response.json();
    if (response.ok) {
      res.json({ token: data.access_token });
    } else {
      res.status(500).json({ error: "Error obtaining token", details: data.error });
    }
  } catch (error) {
    res.status(500).json({ error: err500 });
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

app.post("/api/ticket", jwtCheck, async (req, res) => {
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
