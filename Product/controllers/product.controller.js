const { Product } = require('../models/productSchema');
const CategoryData = require('../models/Category.schema');
const SubCategoryData = require('../models/SubCategory.schema');
const ExtraCategoryData = require('../models/ExtraCategory.schema');

const productPage = async (req, res) => {
  try {
    const products = await Product.find().populate('CategoryId').populate('SubCategoryId').populate('ExtraCategoryId');
    const categories = await CategoryData.find();
    const subcategories = await SubCategoryData.find();
    const extraCategories = await ExtraCategoryData.find();

    if (!products) {
      throw new Error("Products not fetched correctly");
    }

    res.render("index", { products, categories, subcategories, extraCategories, user: req.user || {} });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send({ message: 'Error fetching data', error });
  }
};

const addProduct = async (req, res) => {
  try {
    const { proName, proDescription, proPrice, category, subcategory, extracategory } = req.body;
    const newProduct = new Product({
      proName,
      proDescription,
      proPrice,
      CategoryId: category,
      SubCategoryId: subcategory,
      ExtraCategoryId: extracategory
    });
    await newProduct.save();
    req.flash('success_msg', 'Product added successfully');
    res.redirect('/product');
  } catch (error) {
    console.error('Error adding product:', error);
    req.flash('error_msg', 'Error adding product');
    res.redirect('/product');
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Product deleted successfully');
    res.redirect('/product');
  } catch (error) {
    req.flash('error_msg', 'Error deleting product');
    res.redirect('/product');
  }
};

const updateProduct = async (req, res) => {
  try {
    const { proName, proDescription, proPrice, category, subcategory, extracategory } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
      proName,
      proDescription,
      proPrice,
      CategoryId: category,
      SubCategoryId: subcategory,
      ExtraCategoryId: extracategory
    });
    req.flash('success_msg', 'Product updated successfully');
    res.redirect('/product');
  } catch (error) {
    req.flash('error_msg', 'Error updating product');
    res.redirect('/product');
  }
};

const getProductData = async (req, res) => {
  try {
    const products = await Product.find().populate('CategoryId').populate('SubCategoryId').populate('ExtraCategoryId');
    res.send(products);
  } catch (error) {
    res.send({ message: 'Error fetching products', error });
  }
};

module.exports = { productPage, addProduct, deleteProduct, updateProduct, getProductData };
