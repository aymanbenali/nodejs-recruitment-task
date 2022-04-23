import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import apiRoutes from "./modules";

const { BE_PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(cors());
apiRoutes(app);

app.use((error, _, res, __) => {
  console.error(
    `Error processing request ${error}. See next message for details`
  );
  console.error(error);

  return res.status(500).json({ error: "internal server error" });
});

app.listen(BE_PORT, () => {
  console.log(`movies service is running at port ${BE_PORT}`);
});
