const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// routes 
const userRoutes = require('./routes/user');

// environment variable or constants
env.config();


// MongoDb Connection
// mongodb+srv://departmental-ecommerce:<password>@cluster0.xktbt.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xktbt.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log('Database connected');
});

// first api 
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'hello from backend server side'
    });
});

app.post('/data', (req, res, next) => {
    res.status(200).json({
        message: req.body
    });
});

// midleware 
// app.use(cors()); == in this case corse dosen't work
app.use(bodyParser());
app.use('/api', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server is working on port ${process.env.PORT}`)
})