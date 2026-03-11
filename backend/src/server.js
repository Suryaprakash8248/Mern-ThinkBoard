import dotenv from "dotenv";
dotenv.config();

import express from "express";
import router from "./routers/notesRouter.js";
import { connectDb } from "./config/db.js";
import ratelimiter from "../middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

app.use(express.json());
app.use(ratelimiter);

app.use("/api/notes", router);


  app.use(express.static(path.join(__dirname,"../../frontend/dist")));

  app.use((req, res) => {
  res.sendFile(path.join(__dirname,"../../frontend/dist/index.html"));
});


connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
  });
});