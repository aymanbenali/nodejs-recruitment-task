import dbRoutes from "./db/routes/routes";

export default (app) => {
  app.use("/db", dbRoutes);
};
