const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require("cors");
const app = express();
const path = require('path');
//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'assets')));

let port=process.env.port ||3000

//Mentor db
let mentors = [{
    id: 1,
    name: "Banu Prakash",
    email: "mentor@gmail.com",
    subject: "Node",
   
},

];

//student db
let students = [{
    id: 1,
    name: 'kavinsurya',
    subject: 'Node',
    mentor: "Banu Prakash"
},];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'index.html'));
})

//add mentor api
app.post('/addMentor', (req, res) => {
    req.body.id = mentors.length + 1;
    mentors.push(req.body);
    res.json("Mentor added...");
})
//add student api
app.post('/students', (req, res) => {
    req.body.id = students.length + 1;
    students.push(req.body);
    res.json(students);
})

//get all mentor data
app.get('/mentors', (req, res) => {
    res.json(mentors);
})

//get all student data
app.get('/students', (req, res) => {
    res.json(students);
})

//api for getting students of particular mentor id
app.get('/students/:name', (req, res) => {
    let studentdata = students.filter((student) => student.mentor === req.params.name);
    (studentdata.length !== 0) ? res.json(studentdata): res.status(400).json({ msg: `Mentor with name ${req.params.name} not found` });
})




app.listen(port, () => {
    console.log('Listening to port 3000');
})