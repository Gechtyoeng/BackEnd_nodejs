import { journalists, articles } from "../models/data.js";

//get all journalists
export const getAllJournalists = (req, res) => {
    res.json(journalists);
};

//get a single journalist by id
export const getJournalistById = (req, res) => {
    const journalistId = parseInt(req.params.id, 10);
    const journalist = journalists.find(j => j.id === journalistId);
    
    if (!journalist) {
        return res.status(404).json({ message: 'Journalist not found' });
    }
    
    res.json(journalist);
};

//create a new journalist
export const createJournalist = (req, res) => {
    const newJournalist = req.body;
    
    if (!newJournalist.name || !newJournalist.email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }
    
    newJournalist.id = journalists.length ? journalists[journalists.length - 1].id + 1 : 1;
    journalists.push(newJournalist);
    
    res.status(201).json(newJournalist);
};

//update journalist info
export const updateJournalist = (req, res) => {
    const journalistId = parseInt(req.params.id, 10);
    const journalistIndex = journalists.findIndex(j => j.id === journalistId);
    
    if (journalistIndex === -1) {
        return res.status(404).json({ message: 'Journalist not found' });
    }
    
    const updatedJournalist = { ...journalists[journalistIndex], ...req.body };
    journalists[journalistIndex] = updatedJournalist;
    
    res.json(updatedJournalist);
};

//delete a journalist by id
export const deleteJournalist = (req, res) => {
    const journalistId = parseInt(req.params.id, 10);
    const journalistIndex = journalists.findIndex(j => j.id === journalistId);
    
    if (journalistIndex === -1) {
        return res.status(404).json({ message: 'Journalist not found' });
    }
    
    journalists.splice(journalistIndex, 1);
    
    res.status(204).send();
};

//get article by specific journalist
export const getArticlesByJournalist = (req, res) => {
    const journalistId = parseInt(req.params.id, 10);
    const articlesByJournalist = articles.filter(article => article.journalistId === journalistId);
    
    if (articlesByJournalist.length === 0) {
        return res.status(404).json({ message: 'No articles found for this journalist' });
    }
    
    res.json(articlesByJournalist);
}

