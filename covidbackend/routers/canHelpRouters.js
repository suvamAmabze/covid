import express from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

//define storage for image by multer-----
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./covidfrontend/build/upload");
    // callback(null, "./covidfrontend/public/upload");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
    // callback(null, file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
});
//---

const canHelpRouters = express.Router(); //create router

//mongoDB schema and model---------------------------------------------------------------------------------------------------------
const callCanHelpModel = (cityName, optionName) => {
  const InfoSchema = new mongoose.Schema(
    {
      fullName: { type: String, required: true },
      phone: { type: String },
      address: { type: String, required: true },
      link: { type: String },
      articleImage: { type: String },
    },
    {
      timestamps: true,
    }
  );

  //   console.log(mongoose.models);
  mongoose.models = {};

  const canHelpModel = mongoose.model(`${cityName}${optionName}`, InfoSchema);
  return canHelpModel;
};
//------------------------------------------------------------------------------------------------------------------------------------

canHelpRouters.post(
  "/:city/:option/options/can-help",
  upload.single("articleImage"),
  expressAsyncHandler(async (req, res) => {
    // console.log("RF", req.file);
    // console.log("RB", req.body);

    let formReqInfo;

    if (req.file === undefined) {
      console.log("req.file is undefine");
      let cityName = req.params.city;
      let optionName = req.params.option;
      // console.log(cityName,optionName)
      let model = callCanHelpModel(cityName, optionName);

      formReqInfo = new model({
        fullName: req.body.fullName,
        phone: req.body.phone,
        address: req.body.address,
        link: req.body.link,
        // articleImage: req.file.filename,
      });
    } else {
      console.log("req.file is not undefine");
      let cityName = req.params.city;
      let optionName = req.params.option;
      // console.log(cityName,optionName)
      let model = callCanHelpModel(cityName, optionName);

      formReqInfo = new model({
        fullName: req.body.fullName,
        phone: req.body.phone,
        address: req.body.address,
        link: req.body.link,
        articleImage: req.file.filename,
      });
    }

    try {
      const created_formReqInfo = await formReqInfo.save();

      res.send({
        _id: created_formReqInfo._id,
        fullName: created_formReqInfo.fullName,
        phone: created_formReqInfo.phone,
        address: created_formReqInfo.address,
        link: created_formReqInfo.link,
      });
    } catch (error) {
      console.log(error);
    }
  })
);

canHelpRouters.get(
  "/:city/:option/options/need-help",
  expressAsyncHandler(async (req, res) => {
    let cityName = req.params.city;
    let optionName = req.params.option;
    let model = callCanHelpModel(cityName, optionName);

    const Info = await model.find({}).sort({ _id: -1 });
    res.send(Info);
  })
);

export default canHelpRouters;
