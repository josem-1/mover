// controllers/media.controller.js
import { getMediaDetails, getSimilar } from '../services/tmdb.service.js';

/**
 * GET /api/media/:type/:id
 * Returns:  { id, type, title, posterPath, genres[], director }
 */
export async function getDetails(req, res) {
  const { type, id } = req.params;  // type = 'movie' or 'tv'
  try {
    const data = await getMediaDetails(type, id);

    // Pull out director/creator if available
    let director;
    if (data.credits?.crew) {
      director = data.credits.crew.find(c => c.job === 'Director')?.name
              || data.credits.crew.find(c => c.job === 'Creator')?.name;
    }

    res.json({
      success: true,
      media: {
        id:        data.id,
        type,
        title:     data.title || data.name,
        posterPath: data.poster_path,
        genres:    data.genres.map(g => g.name),
        director
      }
    });
  } catch (err) {
    console.error('[Media Controller] getDetails:', err);
    res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * GET /api/media/:type/:id/similar?genre=&director=&mediaType=
 * Returns a filtered list of similar items.
 */
export async function getSimilarContent(req, res) {
  const { type, id } = req.params;
  const { genre, director, mediaType } = req.query;

  try {
    const data = await getSimilar(type, id);
    let results = data.results || [];

    // Filter by genre (TMDB returns genre_ids)
    if (genre) {
      // Convert genre name to its TMDB ID? Or assume the front end passes the ID.
      results = results.filter(item =>
        (item.genre_ids || []).includes(Number(genre))
      );
    }

    // Filter by mediaType (only relevant if you mix movie/tv in the same list)
    if (mediaType) {
      results = results.filter(item => item.media_type === mediaType);
    }

    // (Optional) Director filter would require extra fetch per item—
    // you might skip this or handle client-side.

    res.json({ success: true, results });
  } catch (err) {
    console.error('[Media Controller] getSimilarContent:', err);
    res.status(500).json({ success: false, message: err.message });
  }
}
