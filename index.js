require('dotenv').config({path: './config.env'});
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ extended: true }));
app.use('/api/banks', require('./routes/banks_routes'));
app.use('/api/calculator', require('./routes/calculator_routes'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
} else {
    app.get("/", (req, res) => {
        res.send("Api running");
    });
}

async function start() {
    try {
        await mongoose.connect("mongodb+srv://taras1234:taras1234@calccluster.b2ojn.mongodb.net/CalcCluster?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch(e) {
        console.log("Server error", e.message);
        //process.exit(1);
    } 
}

start();
