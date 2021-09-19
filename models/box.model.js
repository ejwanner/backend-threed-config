const mongoose = require('mongoose');

// create the mongoose schema for the database of Box
const BoxGeometrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    depth: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        default: '#FF33E0',
        required: true,
    }
});

const BoxGeometry = mongoose.model("BoxGeometry", BoxGeometrySchema);

module.exports = BoxGeometry;
