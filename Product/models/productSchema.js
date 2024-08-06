const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    proName: {
        type: String,
        required: true
    },
    proDescription: {
        type: String,
        required: true
    },
    proPrice: {
        type: Number,
        required: true
    },
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category-Table",
        required: true
    },
    SubCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory-Table",
        required: true
    },
    ExtraCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExtraCategory-Table",
        required: true
    }
});

const Product = mongoose.model('ProductData', productSchema);
module.exports = { Product };