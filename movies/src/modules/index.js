import apiRoutes from "./movie/routes/movie.server.routes";

export default (app) => {
  app.use("/api", apiRoutes);
};
