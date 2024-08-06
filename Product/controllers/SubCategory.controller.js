const SubCategoryData = require("../models/SubCategory.schema");

const SubCategoryCreate = async (req, res) => {
    try {
        const { name } = req.body;
        let subcategory = await SubCategoryData.create({ name });
        res.send(subcategory);
    } catch (error) {
        res.send(error.message);
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        let data = await SubCategoryData.findByIdAndUpdate(id, {
            ExtraCategoryId: req.body.ExtraCategoryId
        }, { new: true }); 
        res.send(data);
    } catch (error) {
        res.send(error.message);
    }
}

const GetCategoryWithExtracategories = async (req, res) => {
    try {
        let subcategories = await SubCategoryData.find();
        res.render('subcategories', { subcategories, user: req.user });
    } catch (error) {
        res.send({ message: error.message });
    }
};

const getData = async (req, res) => {
  try {
    let data = await SubCategoryData.find().populate('ExtraCategoryId');
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { SubCategoryCreate, update , GetCategoryWithExtracategories , getData };
