const CategoryData = require("../models/Category.schema");
const SubCategoryData = require("../models/SubCategory.schema");

const CategoryCreate = async (req, res) => {
  try {
      const { name } = req.body;
      let category = await CategoryData.create({ name });
      res.send(category);
  } catch (error) {
      res.send(error.message);
  }
};

const UpdateData = async (req, res) => {
  try {
      const { id } = req.params;
      let data = await CategoryData.findByIdAndUpdate(id, {
          $addToSet: { SubCategoryId: req.body.SubCategoryId }
      }, { new: true }); 
      res.send(data);
  } catch (error) {
      res.send(error.message);
  }
};

const GetCategoryWithSubcategories = async (req, res) => {
  try {
      let categories = await CategoryData.find();
      res.render('categories', { categories , user: req.user });
  } catch (error) {
      res.send({ message: error.message });
  }
};

const getData = async (req, res) => {
  try {
    let data = await CategoryData.find().populate("SubCategoryId");
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message }); 
  }
};

module.exports = { CategoryCreate, UpdateData, getData , GetCategoryWithSubcategories };
