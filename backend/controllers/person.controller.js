import { getPersonCredits } from '../services/tmdb.service.js';

export async function getPersonMedia(req, res) {
  const { id } = req.params;
  try {
    const data = await getPersonCredits(id);
    // Combine cast + crew into a unique list
    const combined = [...data.cast, ...data.crew];
    const unique = Array.from(
      new Map(combined.map(item => [item.id, item])).values()
    );
    res.json({ success: true, results: unique });
  } catch (err) {
    console.error('[Person Controller] getPersonMedia:', err);
    res.status(500).json({ success: false, message: err.message });
  }
}
