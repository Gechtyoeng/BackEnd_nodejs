import express from 'express';
import router from './routes/userRoutes.js';   
import logger from './middleware/logger.js';

const app = express();
app.use(express.json());
app.use(logger);
app.use('/users', router);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
