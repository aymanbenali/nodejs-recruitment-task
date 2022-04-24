import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

/**
 *
 * @param {String} title
 * @throws Will throw an error if the title is null or undefined.
 * @throws Will throw an error if the Omdb api key is null or undefined.
 * @throws Will throw an error if an error came from the Omdb API.
 * @returns Object
 */
const getMovieDetailsFromOmdb = async (title, OMDB_API) => {
  if (!title || title === "") throw new Error("The title is required");
  if (!OMDB_API || OMDB_API === "")
    throw new Error("The Omdb api key is missing");
  const url = `http://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDB_API}`;
  const {
    status,
    data: { Title, Released, Genre, Director, Response, Error: omdbError } = {},
  } = await axios.get(url);
  if (status !== 200) return {};
  if (Response === "False") throw new TypeError(omdbError);
  return { Title, Released, Genre, Director };
};

module.exports = {
  getMovieDetailsFromOmdb,
};
