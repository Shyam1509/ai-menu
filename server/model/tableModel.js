const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({

    tableId: { type: String, required: true, unique: true},
    tableName: { type: String },
    qrUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model( "Table", tableSchema);