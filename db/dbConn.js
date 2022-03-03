const mongoose = require('mongoose');
const DB_URI = process.env.DATABASE_URI;

const dbConn = async () => {
    try {
        const conn = await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
        })
        if(conn) 
            console.log("Database connection successfull");
    }
    catch(err){
        console.log("Error: ", err);
    }
}

dbConn();