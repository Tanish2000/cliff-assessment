const mongoose = require('mongoose');

const metricIDSchema = new mongoose.Schema({
    original_value : {
        type : String
    },
    min_band : {
        type : String
    },
    max_band : {
        type : String
    },
    line_status : {
        type : Number
    },
    timestamp : {
        type : String
    },
    forecasted_value : {
        type : String
    }
})

const metricIDModel = (collection_id) => mongoose.model('metricId',metricIDSchema,collection_id) 
module.exports = metricIDModel;