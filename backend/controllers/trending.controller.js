// backend/controllers/trending.controller.js
import { fetchFromTMDB } from '../services/tmdb.service.js';

/**
 * GET /api/movie/trending
 */
export async function getTrendingMovies(req, res) {
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US`
    );
    return res.json({ success: true, results: data.results });
  } catch (err) {
    console.error('[Trending] Movies', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * GET /api/tv/trending
 */
export async function getTrendingTV(req, res) {
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/trending/tv/day?language=en-US`
    );
    return res.json({ success: true, results: data.results });
  } catch (err) {
    console.error('[Trending] TV', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
