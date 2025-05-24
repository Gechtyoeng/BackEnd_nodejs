import { articles } from "../models/data.js";

//get all articles
export const getAllArticles = (req, res) => {
    res.json(articles);
};

//get article by id
export const getArticleById = (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    const article = articles.find(a => a.id === articleId);
    
    if (!article) {
        return res.status(404).json({ message: 'Article not found' });
    }
    
    res.json(article);
};

//create a new article
export const createArticle = (req, res) => {
    const newArticle = req.body;
    
    if (!newArticle.title || !newArticle.content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }
    
    newArticle.id = articles.length ? articles[articles.length - 1].id + 1 : 1;
    articles.push(newArticle);
    
    res.status(201).json(newArticle);
};

//update existing article by id
export const updateArticle = (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    const articleIndex = articles.findIndex(a => a.id === articleId);
    
    if (articleIndex === -1) {
        return res.status(404).json({ message: 'Article not found' });
    }
    
    const updatedArticle = { ...articles[articleIndex], ...req.body };
    articles[articleIndex] = updatedArticle;
    
    res.json(updatedArticle);
};

//delete an article by id
export const deleteArticle = (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    const articleIndex = articles.findIndex(a => a.id === articleId);
    
    if (articleIndex === -1) {
        return res.status(404).json({ message: 'Article not found' });
    }
    
    articles.splice(articleIndex, 1);
    
    res.status(204).send();
};