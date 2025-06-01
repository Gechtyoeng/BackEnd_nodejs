import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
   const [journalists, setJournalist] = useState([]);
   const [selectedJournalistId, setSelectedJournalistId] = useState('');
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
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

  const fetchJournalists = async () => {
    // Fetch journalists from the API
     try {
      const response = await axios.get('http://localhost:3000/journalists');
      setJournalist(response.data);
    } catch (error) {
      console.error('error fetching journalists', error);
    }
  };

  //function for fetch article by journalist
  const fetchArticlesByJourn = async (journalistId) => {
    try {
      const response = await axios.get(`http://localhost:3000/journalists/${journalistId}/articles`);
      setArticles(response.data);
    } catch (error) {
      console.error(`Error fetching articles for journalist ${journalistId}:`, error);
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

        <button
          onClick={() => {
            // Logic to apply filters
            if(selectedJournalistId){
              fetchArticlesByJourn(selectedJournalistId);
            }else{
              fetchArticles();
            }
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
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