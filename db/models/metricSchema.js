const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    measure: {
        type: String,
    },
    dimensions: [
        {
            name: {
                type: String
            },
            value: {
                type: String
            }
        },
        {
            name: {
                type: String
            },
            value: {
                type: String
            }
        },
        {
            name: {
                type: String
            },
            value: {
                type: String
            }
        },
        {
            name: {
                type: String
            },
            value: {
                type: String
            }
        }
    ]
})

const metric =  mongoose.model('metric' , metricSchema);
module.exports = metric;