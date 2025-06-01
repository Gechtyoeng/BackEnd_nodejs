import express from 'express';
import articlesRoutes from './routes/articlesRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import journalistsRoutes from './routes/journalistsRoute.js';
import logger from './middleware/logger.js';
import cors from 'cors';


const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/articles', articlesRoutes);
app.use('/categories', categoriesRoutes);
app.use('/journalists', journalistsRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
