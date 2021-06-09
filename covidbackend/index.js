const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const path = require("path");
const canHelpRouters = require("./routers/canHelpRouters");

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

const dirname = path.resolve();
app.use(express.static(path.join(dirname, '/covidfrontend/build')));
app.use(express.static(path.join(dirname, '/covidfrontend/public')));
app.get('*', (req, res) =>
  res.sendFile(path.join(dirname, '/covidfrontend/build/index.html'))
);

// app.get("/", (req, res) => {
//   res.send("Server is ready");
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
  console.log("dirname is",dirname)
});
