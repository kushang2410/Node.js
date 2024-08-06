const { Router } = require("express");
const { ExtraCategoryCreate , GetAllExtraCategories } = require("../controllers/ExtraCategory.controller");

const ExtraCategoryRouter = Router();

ExtraCategoryRouter.post('/create', ExtraCategoryCreate);
ExtraCategoryRouter.get('/', GetAllExtraCategories);

module.exports = ExtraCategoryRouter;