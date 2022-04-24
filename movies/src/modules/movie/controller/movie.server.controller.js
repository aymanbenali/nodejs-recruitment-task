import * as db from "../../../../models";
import moment from "moment";
import { Op } from "sequelize";
import { getMovieDetailsFromOmdb } from "../../omdbapi/controller/omdb.server.controller";
import dotenv from "dotenv";

dotenv.config();
const { between } = Op;
const MAX_REACHED_MOVIES_PER_MONTH = 5;

const checkUserMoviesThisMonth = async (userId, startOfMonth, endOfMonth) => {
  return await db.Movies.count({
    where: {
      userId: userId,
      createdAt: {
        [between]: [startOfMonth, endOfMonth],
      },
    },
  });
};

/**
 *
 * @param {Number} userId
 * @throws Will throw an error if the userId is null
 * @returns Boolean
 */

const hasReachedMonthlySubscription = async (userId) => {
  if (!userId) throw new Error("User id is required!");
  const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
  const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");
  const hasReachedMonthlyLimit = await checkUserMoviesThisMonth(
    userId,
    startOfMonth,
    endOfMonth
  );
  if (hasReachedMonthlyLimit >= MAX_REACHED_MOVIES_PER_MONTH) return true;
  return;
};

const createMovie = async (req, res) => {
  try {
    const { userId, role } = req.user || {};
    if (role.toLowerCase().includes("basic")) {
      const hasReachedMonthlyLimit = await hasReachedMonthlySubscription(
        userId
      );
      if (hasReachedMonthlyLimit)
        return res.status(422).json({
          success: false,
          message:
            "We are sorry but your account has reached the maximum number of movies for this month, to remove this limit please upgrade your account to premium",
        });
    }
    const { title = "" } = req.body;
    const { OMDB_API } = process.env;
    const movieDetails = await getMovieDetailsFromOmdb(title, OMDB_API);
    const newMovie = await db.Movies.create({ userId, ...movieDetails });
    res.status(201).json({ success: true, newMovie });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllMoviesByUser = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) throw new Error("Invalid user");
    const movies = await db.Movies.findAll({
      where: { userId: userId },
    });
    res.status(200).json({ success: true, movies });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  hasReachedMonthlySubscription,
  getAllMoviesByUser,
  createMovie,
};
