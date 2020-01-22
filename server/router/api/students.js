const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

const dbUser = process.env.dbUser;
const dbPW = process.env.dbPW;

// get students
router.get('/', async (req, res) => {
    const students = await loadStudentsCollection();
    res.send(await students.find({}).toArray());
});

// add student
router.post('/', async (req, res) => {
    const students = await loadStudentsCollection();
    await students.insertOne({
        name: req.body.name,
        createdAt: new Date()
    });
    res.status(201).send();
});

// update student

// delete student
router.delete('/:id', async (req, res) => {
    const students = await loadStudentsCollection();
    await students.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});

async function loadStudentsCollection() {
    const client = await mongodb.MongoClient.connect
    (`mongodb://${dbUser}:${dbPW}@ds263808.mlab.com:63808/everlive-students`, {
        useNewUrlParser: true
    });

    return client.db('everlive-students').collection('students');
}

module.exports = router;