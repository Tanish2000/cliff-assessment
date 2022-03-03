const MetricIDModel = require('../db/models/metricIDSchema');

const extract_metric_data = async (collection_id) => {
    try{
        const metric_id_data = await MetricIDModel(collection_id).find();
        return metric_id_data;
    }
    catch(err){
        return console.error(err);
    }    
}

module.exports = extract_metric_data;