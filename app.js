import http from "http";
import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import expressFileUpload from "express-fileupload";
import UserRouter from "./routes/user_route.js";
import CategoryRouter from "./routes/category_route.js";
import TagRouter from "./routes/tag_route.js";

configDotenv({ path: ".env" });
const app = express();
const server = http.createServer(app);
mongoose.connect(process.env.DB_URL);

app.get("/", (req, res) => {
  res.send("Media API is running");
});

app.use(express.static("public"));
app.use(expressFileUpload());
app.use(express.json());
app.use("/users", UserRouter);
app.use("/cats", CategoryRouter);
app.use("/tags", TagRouter);

app.use((error, req, res, next) => {
  error.status = error.status || 400;
  res.status(error.status).json({ con: false, msg: error.message });
});

const port = Number(process.env.PORT) || 3000;

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
