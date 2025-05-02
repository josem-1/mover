// backend/controllers/user.controller.js
import { User } from '../models/user.model.js';

// GET /api/user/watchlist
export async function getWatchlist(req, res) {
  try {
    const user = await User.findById(req.user.id);
    return res.json({ success: true, watchlist: user.watchlist });
  } catch (err) {
    console.error('[User Controller] getWatchlist:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

// POST /api/user/watchlist
export async function addToWatchlist(req, res) {
  try {
    const { media } = req.body; // expects the watchEntry object
    const user = await User.findById(req.user.id);
    user.watchlist.push(media);
    await user.save();
    return res.json({ success: true, watchlist: user.watchlist });
  } catch (err) {
    console.error('[User Controller] addToWatchlist:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function removeFromWatchlist(req, res) {
  console.log('DELETE /api/user/watchlist/:mediaId →', req.params.mediaId);
  try {
    const mediaIdNum = parseInt(req.params.mediaId, 10);
    const user = await User.findById(req.user.id);
    user.watchlist = user.watchlist.filter(
      entry => entry.mediaId !== mediaIdNum
    );
    await user.save();
    return res.json({ success: true, watchlist: user.watchlist });
  } catch (err) {
    console.error('[User Controller] removeFromWatchlist:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

// GET /api/user/watchhistory
export async function getWatchHistory(req, res) {
  try {
    const user = await User.findById(req.user.id);
    return res.json({ success: true, watchHistory: user.watchHistory });
  } catch (err) {
    console.error('[User Controller] getWatchHistory:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

// POST /api/user/watchhistory
export async function addToWatchHistory(req, res) {
  try {
    const { media } = req.body;
    const user = await User.findById(req.user.id);
    user.watchHistory.push(media);
    await user.save();
    return res.json({ success: true, watchHistory: user.watchHistory });
  } catch (err) {
    console.error('[User Controller] addToWatchHistory:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function removeFromWatchHistory(req, res) {
  try {
    const { mediaId } = req.params;
    const user = await User.findById(req.user.id);
    user.watchHistory = user.watchHistory.filter(entry => entry.mediaId !== mediaId);
    await user.save();
    return res.json({ success: true, watchHistory: user.watchHistory });
  } catch (err) {
    console.error('[User Controller] removeFromWatchHistory:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
