const express = require("express");
const app = express();

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
  const url = `http://127.0.0.1:7071/api/add-english-entry`;
  const data = { Body: text, Created: new Date().toISOString() };
  console.log(`Posting data to ${url}`);
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // if its 2xx then its ok
    if (response.ok) {
      return res.status(200).send("Text uploaded");
    } else {
      return res.status(500).send("Something went wrong");
    }
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
  // query azure function at: http://localhost:7071/api/getentries/{language}
  const url = `http://127.0.0.1:7071/api/getentries/${language}`;
  console.log(`Fetching data from ${url}`);
  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).send(data);
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
