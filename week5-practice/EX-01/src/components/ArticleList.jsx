import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UpdateArticleForm from './UpdateArticleForm';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
     try {
      const response = await axios.get('http://localhost:3000/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const deleteArticle = async (id) => {
    // Delete an article by ID
    try {
      await axios.delete(`http://localhost:3000/articles/${id}`);

      setArticles(prev => prev.filter(article => article.id !== id));
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  return (
    <div>
      {/* Navigation Links */}
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>📄 View Articles</Link>
        <Link to="/add"> ➕ Add Article</Link>
      </nav>

      <h2>Articles</h2>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button onClick={() => deleteArticle(article.id)}>Delete</button>
            <button onClick={() => {
              // Navigate to update article form with article ID /articles/update/${article.id}
              navigate(`/update/${article.id}`);
            
            }}>Update</button>
            
            <button onClick={() => {
              // Navigate to view article details with article ID /articles/${article.id}
              navigate(`/articles/${article.id}`);
            }}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}