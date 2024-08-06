const ExtraCategoryData = require("../models/ExtraCategory.schema");

const ExtraCategoryCreate = async (req, res) => {
  try {
      let category = await ExtraCategoryData.create(req.body);
      res.send(category);
  } catch (error) {
      res.send(error.message);
  }
};

const GetAllExtraCategories = async (req, res) => {
  try {
      let extracategories = await ExtraCategoryData.find();
      res.render('extracategories', { extracategories , user: req.user });
  } catch (error) {
      res.send({ message: error.message });
  }
};
module.exports = { ExtraCategoryCreate , GetAllExtraCategories };
