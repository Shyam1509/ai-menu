const mongoose = require("mongoose");
const URI = process.env.MONGO_URI

const dbConnection = async () => {
    try {
        await mongoose.connect(URI)
        console.log(`database is connected`);
        
        
    } catch (error) {
        console.error(`database error`, error);
        
    }

}

module.exports = dbConnection;