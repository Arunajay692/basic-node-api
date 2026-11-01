import { Router } from 'express';
import itemsRoutes from './items.routes.js';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Feature routes
router.use('/items', itemsRoutes);

export default router;

