import express from "express";
import * as controller from "../controller/movie.server.controller";
import { authJwt } from "../../middleware/authenticate";

const route = express.Router();

route.get("/movies", authJwt, controller.getAllMoviesByUser);
route.post("/movies", authJwt, controller.createMovie);

export default route;
