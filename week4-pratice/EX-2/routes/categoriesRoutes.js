import express from 'express';
import { getAllCategories, getCategoryById, updateCategory, createCategory,deleteCategory,getArticlesByCategory } from '../controllers/categoriesController.js';

const router = express.Router();

// Define each route for category operations
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);
router.get('/:id/articles', getArticlesByCategory);

export default router;