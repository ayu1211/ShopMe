import Product from "../models/Product.js";
import fs from 'fs';
import path from "path";

export const getProducts = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const query = search ? {name:{$regex:search,$options:'1'}} : {}; 
    const products = await Product.find({});
    res.json(products);
  } catch (err) { next(err); }
};

export const getProductById = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) { next(err); }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price = 0, countInStock = 0, category } = req.body;
    const images = (req.files || []).map(f => f.path);
    const product = await Product.create({ name, description, price: Number(price), countInStock: Number(countInStock), images, category });
    res.status(201).json(product);
  } catch (err) { next(err); }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    Object.keys(req.body).forEach(k => product[k] = req.body[k]);
    if (req.files && req.files.length) product.images.push(...req.files.map(f => f.path));
    await product.save();
    res.json(product);
  } catch (err) { next(err); }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    // optional: remove images from disk
    (product.images || []).forEach(p => {
      try { fs.unlinkSync(path.resolve(p)); } catch (e) {}
    });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};

