// Simple Express server setup to serve for local testing/dev API server
const fs = require('fs');
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const apiResponse = require('./data.json');

const app = express();
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());

const HOST = process.env.API_HOST || 'localhost';
const PORT = process.env.API_PORT || 3002;

app.get('/api/v1/endpoint', (req, res) => {
    res.json({ success: true });
});

app.get('/api/v1/task', (req, res) => {
    res.json(apiResponse.taskList);
});

app.get('/api/v1/task/:id', (req, res) => {
    res.json(apiResponse.taskList[req.params.id - 1]);
});

app.post('/api/v1/task', (req, res) => {
    res.json(apiResponse.taskInserted);
});

app.put('/api/v1/task/:id/note/:note_id', (req, res) => {

    console.log(req.body);
    let notes = [];
    apiResponse.taskList.forEach((task) => {
        if (task.id == req.params.id) {
            //notes = task.notes;
            Object.assign(notes, task.notes);

            notes.forEach((note) => {
                if (note.id == req.params.note_id) {
                    //note = req.body;
                    Object.assign(note, req.body);
                }
            });
        }
    })

    let json = JSON.stringify(apiResponse);
    fs.writeFileSync(`${__dirname}/data.json`, json, 'utf8', (cb) => {
        console.log(`Callback: ${cb}`);
    });

    res.json(notes);
});

app.post('/api/v1/task/:id/note/', (req, res) => {

    console.log(req.body);
    let notes = [];
    apiResponse.taskList.forEach((task) => {
        if (task.id == req.params.id) {
            task.notes.push({
                id: Math.floor(Math.random() * 1000),
                created_date: new Date().toISOString(),
                name: req.body.name,
                text: req.body.text
            });

            Object.assign(notes, task.notes);
        }
    });

    let json = JSON.stringify(apiResponse);
    fs.writeFileSync(`${__dirname}/data.json`, json, 'utf8', (cb) => {
        console.log(`Callback: ${cb}`);
    });

    res.json(notes);
})

app.get('/api/v1/notes', (req, res) => {
    res.json(apiResponse.noteList);
});

app.get('/api/v1/notes/:id', (req, res) => {
    res.json(apiResponse.noteList[req.params.id - 1]);
});

app.post('/api/v1/notes/:id', (req, res) => {
    let lastId = apiResponse.noteList[apiResponse.noteList.length - 1].id;

    console.log(lastId);
});

app.put('/api/v1/notes/:id', (req, res) => {
    apiResponse.noteList[req.params.id - 1].text = req.body.text;

    let json = JSON.stringify(apiResponse);
    fs.writeFileSync(`${__dirname}/data.json`, json, 'utf8', (cb) => {
        console.log(`Callback: ${cb}`);
    });

    res.json(apiResponse.noteList[req.params.id - 1]);
});

app.listen(PORT, () =>
    console.log(`✅  API Server started: http://${HOST}:${PORT}/api/v1/`)
);
