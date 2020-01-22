const express = require('express');
const app = express();
const cors = require('cors');

// middlewares
app.use(express.json());
app.use(cors());
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const students = require('./router/api/students.js');

app.use('/api/students', students);

app.get('/', (req, res) => {
    res.send('yep');
});

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});