import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalist] = useState([]);
  const [categories, setCategory] = useState([]);
  const [selectedJournalistId, setSelectedJournalistId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  const fetchArticles = async (journalistId, categoryId) => {
    // Fetch articles from the API
    try {
      let url = 'http://localhost:3000/articles';

      if (journalistId && categoryId) {
        url += `?journalistId=${journalistId}&categoryId=${categoryId}`;
      } else if (journalistId) {
        url += `?journalistId=${journalistId}`;
      } else if (categoryId) {
        url += `?categoryId=${categoryId}`;
    }

  const response = await axios.get(url);
  setArticles(response.data);
    } catch (error) {
      console.error('error fetching articles', error);
    }
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    try {
      const response = await axios.get('http://localhost:3000/journalists');
      setJournalist(response.data);
    } catch (error) {
      console.error('error fetching journalists', error);
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
  
  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter"
        value={selectedJournalistId}
        onChange={(e) => setSelectedJournalistId(e.target.value)}>
          <option value="">All Journalists</option>
          {/* Options for journalists */}
           {
            journalists.map(journalist => (
              <option key={journalist.id} value={journalist.id}>{journalist.name}</option>
            ))
          }
        </select>

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter"
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}>
          <option value="">All Categories</option>
          {/* Options for categories */}
          {
            categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))
          }
        </select>

        <button
          onClick={() => {
            fetchArticles(selectedJournalistId,selectedCategoryId);
          }
          }
        >Apply Filters</button>
        <button
          onClick={() => {
            setSelectedCategoryId('');
            setSelectedJournalistId('');
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