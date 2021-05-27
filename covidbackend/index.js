import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

//import Routers-:
import canHelpRouters from "./routers/canHelpRouters.js"

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB = process.env.MONGODB_URL;
mongoose
  .connect(process.env.MONGODB_URL || DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`DB connection successful`);
  })
  .catch((error) => {
    console.log(`${DB} is getting some error ${error}`);
  });

//Routers-:
app.use("/api", canHelpRouters);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/covidfrontend/build')));
app.use(express.static(path.join(__dirname, '/covidfrontend/public')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/covidfrontend/build/index.html'))
);

// app.get("/", (req, res) => {
//   res.send("Server is ready");
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
