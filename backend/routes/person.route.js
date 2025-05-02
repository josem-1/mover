import express from 'express';
import { getPersonMedia } from '../controllers/person.controller.js';

const router = express.Router();
router.get('/:id/media', getPersonMedia);

export default router;
