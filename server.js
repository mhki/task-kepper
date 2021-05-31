const { time } = require('console');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
// const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

const MONGODB_URI = "mongodb+srv://miki:mikemunene@cluster0.6hwj5.mongodb.net/task?retryWrites=true&w=majority"

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());
// HTTP request logger
app.use(morgan('tiny'));
app.use('/', routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('/build'));
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));