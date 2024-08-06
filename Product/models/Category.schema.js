const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: String,
    SubCategoryId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory-Table"
    }]
});

const CategoryData = mongoose.model("Category-Table", CategorySchema);

module.exports = CategoryData;
