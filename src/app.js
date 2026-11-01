import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './routes/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// Global Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Basic Express API',
    endpoints: {
      health: '/api/health',
      items: '/api/items'
    }
  });
});

// Mount API routes under /api
app.use('/api', apiRouter);

// 404 Handler for undefined routes
app.use(notFoundHandler);

// Central Error Handler
app.use(errorHandler);

export default app;

