const express = require('express');

const router = express.Router();

const TaskReminder = require('../models/taskReminder');
router.get('/api', (req, res) => {

    TaskReminder.find({})
        .then((data) => {
            console.log('Data:', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error', error)
        });
});

router.get('/dashboard', (req, res) => {
    return 0;
})

router.post('/save', (req, res) => {
    const data = req.body;

    const newTaskReminder = new TaskReminder(data);

    newTaskReminder.save((error) => {
        if (error) {
            res.status(500).json({ msg: "Sorry internal server error" });
            return;
        }
        return res.json({
            msg: "Your data has been saved to database"
        });
    });
});

router.get('/api/name', (req, res) => {
    const data = {
        username: 'peter',
        age: 5
    };
    res.json(data);

});

module.exports = router;