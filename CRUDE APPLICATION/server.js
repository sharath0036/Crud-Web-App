const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', 
    database: 'crud_app'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.post('/create', (req, res) => {
    const { content } = req.body;
    const query = 'INSERT INTO data (content) VALUES (?)';
    db.query(query, [content], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({ id: result.insertId, content });
        }
    });
});

app.get('/read', (req, res) => {
    const query = 'SELECT * FROM data';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    });
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const query = 'UPDATE data SET content = ? WHERE id = ?';
    db.query(query, [content, id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({ id, content });
        }
    });
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM data WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({ id });
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
