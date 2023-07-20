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
      const tableBody = document.getElementById(`table-body-${language}`);
      tableBody.innerHTML = ""; // Clear existing content

      for (const row of data) {
        console.log(row.created);
        const date = new Date(row.created);
        // just extract the time portion with am and pm ie not military time
        const utcTime = date.toUTCString().split(" ")[4];
        const time = convertTo12Hour(utcTime);

        const tableRow = document.createElement("tr");
        const dateCell = document.createElement("td");
        const textCell = document.createElement("td");

        dateCell.textContent = `${time}`;
        textCell.textContent = `${row.body}`;

        tableRow.appendChild(dateCell);
        tableRow.appendChild(textCell);
        tableBody.appendChild(tableRow);
      }
    } else {
      alert("Error: " + response.statusText);
    }
  } catch (err) {
    console.error("Error:", err);
    alert("An error occurred. Please try again.");
  }
}

const convertTo12Hour = (time) => {
  const timeParts = time.split(":");
  let hour = parseInt(timeParts[0]);
  const minutes = timeParts[1];
  const period = hour >= 12 ? "PM" : "AM";

  if (hour >= 13) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }

  return `${hour}:${minutes} ${period}`;
};

document.getElementById("upload-btn").addEventListener("click", function () {
  uploadText(document.getElementById("text-input").value);
  // Clear the input field
  document.getElementById("text-input").value = "";
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
