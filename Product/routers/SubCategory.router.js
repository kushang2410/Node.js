const { Router } = require("express");
const { SubCategoryCreate, update, getData , GetCategoryWithExtracategories } = require("../controllers/SubCategory.controller");

const SubCategoryRouter = Router();

SubCategoryRouter.post('/create', SubCategoryCreate);
SubCategoryRouter.patch('/update/:id', update);
SubCategoryRouter.get('/getData',getData)
SubCategoryRouter.get('/', GetCategoryWithExtracategories);

module.exports = SubCategoryRouter;