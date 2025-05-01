//import axios from "axios";
//import { ENV_VARS } from "../config/envVars.js";

//export const fetchFromTMDB = async (url) => {
//	const options = {
//		headers: {
//			accept: "application/json",
//			Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY,
//		},
//	};
//
//	const response = await axios.get(url, options);
//
//	if (response.status !== 200) {
//		throw new Error("Failed to fetch data from TMDB" + response.statusText);
//	}
//
//	return response.data;
//};
import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromTMDB = async (url) => {
  try {
    // TMDB v3 endpoints require the key in the query string:
    const fullUrl = url.includes("?")
      ? `${url}&api_key=${ENV_VARS.TMDB_API_KEY}`
      : `${url}?api_key=${ENV_VARS.TMDB_API_KEY}`;

    const response = await axios.get(fullUrl, {
      headers: { accept: "application/json" },
    });

    return response.data;
  } catch (error) {
    // Log the full TMDB error so you can see status_message, status_code, etc.
    console.error("[TMDB Service] fetchFromTMDB error:", error.response?.data || error.message);
    throw error;
  }
};


export async function searchTMDB(type, query) {
  const url = `https://api.themoviedb.org/3/search/${type}?language=en-US&query=${encodeURIComponent(query)}`;
  return fetchFromTMDB(url);
}

export async function getMediaDetails(type, id) {
  return fetchFromTMDB(
    `https://api.themoviedb.org/3/${type}/${id}?language=en-US&append_to_response=credits`
  );
}

export async function getSimilar(type, id) {
  return fetchFromTMDB(
    `https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US`
  );
}
