const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000; // Use the PORT provided by Render or default to 3000

// Middleware to parse JSON data
app.use(express.json());

// Serve static files from the public folder
app.use(express.static('public'));

// Connect to the SQLite database
const db = new sqlite3.Database('data.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Create the table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS LoveData (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name1 TEXT,
            name2 TEXT,
            loveScore INTEGER
        )`);
    }
});

// POST route to save data to the database
app.post('/submit_names', (req, res) => {
    const { name1, name2, loveScore } = req.body;

    const sql = `INSERT INTO LoveData (name1, name2, loveScore) VALUES (?, ?, ?)`;
    db.run(sql, [name1, name2, loveScore], function (err) {
        if (err) {
            console.error('Error inserting data:', err.message);
            return res.status(500).json({ message: 'Failed to save data' });
        }
        res.json({ message: 'Data saved successfully' });
    });
});

// GET route to retrieve data from the database
app.get('/data', (req, res) => {
    const sql = `SELECT * FROM LoveData`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
