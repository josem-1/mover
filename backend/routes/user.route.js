import express from 'express';
import { getWatchlist, addToWatchlist, getWatchHistory, addToWatchHistory } from '../controllers/user.controller.js';
const router = express.Router();
router.get('/watchlist', getWatchlist);
router.post('/watchlist', addToWatchlist);
router.get('/watchhistory', getWatchHistory);
router.post('/watchhistory', addToWatchHistory);
export default router;