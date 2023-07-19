async function uploadText(text) {
  try {
    const response = await fetch("/upload-english", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });

    if (response.ok) {
      alert("Text uploaded successfully");
    } else {
      alert("Error: " + response.statusText);
    }
  } catch (err) {
    console.error("Error:", err);
    alert("An error occurred. Please try again.");
  }
}

async function fetchText(language) {
  try {
    const response = await fetch(`/get-text?language=${language}`);
    const data = await response.json();

    if (response.ok) {
      let content = "";
      for (const row of data) {
        const date = new Date(row.created);
        const formattedDate = date.toLocaleString();

        content += `Created: ${formattedDate}\nText: ${row.body}\n\n`;
      }

      document.getElementById("display-area").textContent = content;
    } else {
      alert("Error: " + response.statusText);
    }
  } catch (err) {
    console.error("Error:", err);
    alert("An error occurred. Please try again.");
  }
}

document.getElementById("upload-btn").addEventListener("click", function () {
  uploadText(document.getElementById("text-input").value);
});

document
  .getElementById("fetch-english-btn")
  .addEventListener("click", function () {
    fetchText("english");
  });

document
  .getElementById("fetch-spanish-btn")
  .addEventListener("click", function () {
    fetchText("spanish");
  });
