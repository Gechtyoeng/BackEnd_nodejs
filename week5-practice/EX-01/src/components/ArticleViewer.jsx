import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Function to fetch article by ID
    fetchArticleById();
  }, [id]);

    const fetchArticleById = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/articles/${id}`);
      setArticle(response.data);

    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Fail to fetch article with this id');
    }finally{
      setLoading(false);
    }
   
  }

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>No article found.</div>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <div>
        <strong>Journalist ID:</strong> {article.journalistId}
      </div>
      <div>
        <strong>Category ID:</strong> {article.categoryId}
      </div>
    </div>
  );
}