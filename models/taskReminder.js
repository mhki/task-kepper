const mongoose = require('mongoose');

//schema
const Schema = mongoose.Schema;
const TaskReminderSchema = new Schema({
    id: Number,
    task: String,
    date: {
        type: String,
        default: Date.now()
    },
    time: {
        type: String,
    },

});
//Model
const TaskReminder = mongoose.model('TaskReminder', TaskReminderSchema);

module.exports = TaskReminder;