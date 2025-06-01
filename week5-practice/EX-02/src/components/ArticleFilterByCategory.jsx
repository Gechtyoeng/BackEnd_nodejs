import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const response = await axios.get('http://localhost:3000/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('error fetching articles', error);
    }
  };

  const fetchCategories = async () => {
    // Fetch categories from the API
    try {
      const response = await axios.get('http://localhost:3000/categories');
      setCategory(response.data);
    } catch (error) {
      console.error('fail to fetch catergories', error);
    }
  }

  //function to handle fetch articles by categories
  const fetchArticlesByCat = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:3000/categories/${categoryId}/articles`);
      setArticles(response.data);
    } catch (error) {
       console.error(`Error fetching articles for category ${categoryId}:`, error);
    }
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter"
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}>
          <option value="">All Categories</option>
          {/* Options for categories */}
           {
            categories.map(catergory => (
              <option key={catergory.id} value={catergory.id}>{catergory.name}</option>
            ))
          }
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            if(selectedCategoryId){
              fetchArticlesByCat(selectedCategoryId);
            }else{
              fetchArticles();
            }

          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
            setSelectedCategoryId('');
            fetchArticles();
          }}
        >Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}