const app = require('express')();
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

//configuring env variables
dotenv.config({ path: path.resolve(__dirname, './config.env') });

//database connection
require('./db/dbConn')

//importing database models
const Metrics = require('./db/models/metricSchema');


//importing utils
const extract_metric_data = require('./utils/extract_metric_data');

app.use(cors());
app.use(express.json());


app.get('/getData/:id', async (req, res) => {
    const id = req.params['id'];
    try {
        const metrics = await Metrics.find();
        const metric_data = await extract_metric_data(metrics[id]['_id']);
        return res.status(200).json({
            "status": 200,
            "metric_meta_data": metrics[id],
            "metric_data": metric_data
        });
    }
    catch (err) {
        return res.status(500).json({
            "status": 500,
            "error": err.message
        })
    }
})

if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        console.log("Serving static files")
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.eventNames.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server listening on Port :", PORT);
})
