const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
    name: String,
    ExtraCategoryId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExtraCategory-Table"
    }]
});

const SubCategoryData = mongoose.model("SubCategory-Table", SubCategorySchema);

module.exports = SubCategoryData;
