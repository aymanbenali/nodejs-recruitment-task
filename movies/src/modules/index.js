import dbRoutes from "./movie/routes/movie.server.routes";

export default (app) => {
  app.use("/db", dbRoutes);
};
