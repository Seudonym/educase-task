import bodyParser from "body-parser";
import express from "express";
import { config } from "dotenv";
import routes from "./routes";
import { initDB } from "./config/db";

config();
initDB();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
