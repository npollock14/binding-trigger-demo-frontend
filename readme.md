# Simple Language App

## Description

This is a simple full-stack application that allows users to upload English text to a database and fetch text from the database in both English and Spanish. It uses Express.js for the backend, PostgreSQL for the database, and vanilla JavaScript with Fetch API for the frontend.

## Setup and Installation

Before running the project, make sure you have Node.js, npm, and PostgreSQL installed on your machine.

1. Clone the repository:

2. Install dependencies:

   ```
   npm install
   ```

3. Set up your PostgreSQL database and update the database connection details in `server.js`. Password can be configured in `.env` file. (Rename to `.env` from `example.env`)

Run the following sql commands to get the tables set up:

```
CREATE TABLE english (
        id SERIAL PRIMARY KEY,
        body TEXT NOT NULL,
        created TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE spanish (
        id SERIAL PRIMARY KEY,
        body TEXT NOT NULL,
        created TIMESTAMP NOT NULL DEFAULT NOW()
    );
```

4. Run the server:

   ```
   node server.js
   ```

The application is now running at `http://localhost:3000`.

## Usage

### Upload English Text

Enter some English text in the input field and click the "Upload English Text" button. The text will be uploaded to the `english` table in the database.

### Fetch Text

Click either the "Fetch English Text" or "Fetch Spanish Text" button to fetch text from the corresponding table in the database. The fetched text, along with the time it was created, will be displayed below the buttons.

## License

This project is licensed under the MIT License.
