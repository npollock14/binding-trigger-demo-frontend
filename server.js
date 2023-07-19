const express = require("express");
const app = express();
require("dotenv").config();
const { Client } = require("pg");
const client = new Client({
  host: "localhost",
  port: 28813,
  database: "azure_functions_extension",
  user: "npollock",
  password: process.env.PG_PASSWORD,
});
client.connect();
const supportedLanguages = ["english", "spanish"];

// This will parse JSON bodies
app.use(express.json());
app.use(express.static("public"));

// Handle POST requests to be able to upload text to the english table in the database
app.post("/upload-english", async (req, res) => {
  const text = req.body.text;
  if (!text) {
    return res.status(400).send("Please provide some text");
  }
  const query = `INSERT INTO english (body) VALUES ('${text}')`;
  try {
    const result = await client.query(query);
    if (result.rowCount !== 1) {
      return res.status(500).send("Something went wrong");
    }
    return res.status(200).send("Text uploaded successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
});

// Handle GET requests to be able to get text in any supported language
app.get("/get-text", async (req, res) => {
  const language = req.query.language;
  if (!language) {
    return res.status(400).send("Please provide a language");
  }
  if (!supportedLanguages.includes(language)) {
    return res.status(400).send("Language not supported");
  }
  const query = `SELECT created, body FROM ${language}`; // Changed here
  try {
    const result = await client.query(query);
    return res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
});

// Listen for the process's 'exit' event
process.on("exit", (code) => {
  client.end();
  console.log(`About to exit with code: ${code}`);
});

// Listen on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
  console.log("http://localhost:3000");
});
