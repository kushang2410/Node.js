const { Router } = require('express');
const { productPage, addProduct, deleteProduct, updateProduct } = require('../controllers/product.controller');
const productRouter = Router();

productRouter.get('/', productPage);
productRouter.post('/', addProduct);
productRouter.post('/delete/:id', deleteProduct);
productRouter.post('/update/:id', updateProduct);

module.exports = productRouter;
