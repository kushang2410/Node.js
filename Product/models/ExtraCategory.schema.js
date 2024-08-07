const mongoose = require('mongoose');

const ExtraCategorySchema = new mongoose.Schema({
    name: String
});

const ExtraCategoryData = mongoose.model("ExtraCategory-Table", ExtraCategorySchema);

module.exports = ExtraCategoryData;
