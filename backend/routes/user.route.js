import express from 'express';
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,    // ← must be imported
  getWatchHistory,
  addToWatchHistory,
  removeFromWatchHistory
} from '../controllers/user.controller.js';

const router = express.Router();

// … your GET + POST …
router.get(   '/watchlist',           getWatchlist);
router.post(  '/watchlist',           addToWatchlist);
router.delete('/watchlist/:mediaId',  removeFromWatchlist);  // ← this line

router.get(   '/watchhistory',        getWatchHistory);
router.post(  '/watchhistory',        addToWatchHistory);
router.delete('/watchhistory/:mediaId', removeFromWatchHistory);

export default router;
