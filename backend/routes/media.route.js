import express from 'express';
import { getDetails, getSimilarContent } from '../controllers/media.controller.js';
const router = express.Router();
router.get('/:type/:id', getDetails);
router.get('/:type/:id/similar', getSimilarContent);
export default router;