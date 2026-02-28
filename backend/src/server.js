import express from "express";
import router from "./routers/notesRouter.js";
import {connectDb} from "./config/db.js";
import dotenv from "dotenv";
import ratelimiter from "../middleware/rateLimiter.js";
import cors from "cors";

const app = express();
const port = 3000;



dotenv.config();
app.use(cors({
  origin:"http://localhost:5173"
}));
app.use(express.json());
app.use(ratelimiter);

app.use("/api/notes",router);



connectDb().then(()=> {
  app.listen(port, ()=> {
  console.log(`server listening at port ${port}` );
});

});


