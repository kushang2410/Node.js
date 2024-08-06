const { Router } = require("express");
const { CategoryCreate, UpdateData, getData, GetCategoryWithSubcategories} = require('../controllers/Category.controller');

const CategoryRouter = Router();

CategoryRouter.post('/create', CategoryCreate);
CategoryRouter.patch('/update/:id', UpdateData);
CategoryRouter.get('/getData', getData); 
CategoryRouter.get('/', GetCategoryWithSubcategories);

module.exports = CategoryRouter;