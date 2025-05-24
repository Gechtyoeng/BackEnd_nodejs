import { categories, articles } from "../models/data.js";

// Get all categories
export const getAllCategories = (req, res) => {
    res.json(categories);
};

// Get category by ID
export const getCategoryById = (req, res) => {
    const categoryId = parseInt(req.params.id, 10);
    const category = categories.find(c => c.id === categoryId);
    
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
};

//create a new category
export const createCategory = (req, res) => {
    const newCategory = req.query;
    if (!newCategory.name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    newCategory.id = categories.length ? categories[categories.length - 1].id + 1 : 1;
    categories.push(newCategory);
    res.status(201).json(newCategory);
}

//update category
export const updateCategory = (req, res) => {
    const categoryId = parseInt(req.params.id, 10);
    const categoryIndex = categories.findIndex(c => c.id === categoryId);
    
    if (categoryIndex === -1) {
        return res.status(404).json({ message: 'Category not found' });
    }
    
    const updatedCategory = { ...categories[categoryIndex], ...req.query };
    categories[categoryIndex] = updatedCategory;
    
    res.json(updatedCategory);
};

//delete gategory
export const deleteCategory = (req, res) => {
    const categoryId = parseInt(req.params.id, 10);
    const categoryIndex = categories.findIndex(c => c.id === categoryId);
    
    if (categoryIndex === -1) {
        return res.status(404).json({ message: 'Category not found' });
    }
    
    categories.splice(categoryIndex, 1);
    
    res.status(204).send();
};

//get articles by category
export const getArticlesByCategory = (req, res) => {
    const categoryId = parseInt(req.params.id, 10);
    const categoryArticles = articles.find(c => c.categoryId === categoryId);
    
    if (categoryArticles.length === 0) {
        return res.status(404).json({ message: 'No articles found for this category' });
    }
    
    res.json(categoryArticles);
};
