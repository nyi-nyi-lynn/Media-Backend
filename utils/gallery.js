import fs from "fs";
import path from "path";

const getFilePath = (filename) =>
  path.join(__dirname, "../public/images/" + filename);
const getImageLink = (filename) => `${process.env.IMAGE_PATH}/${filename}`;
const genFileName = (filename) =>
  new Date().valueOf() + `_${filename.replace(/\s/g)}`;

const shareSaveFile = (file) => {
  let filename = genFileName(file.name);
  file.mv(getFilePath(filename));
  return getImageLink(filename);
};

const saveSingleFile = (req, res, next) => {
  if (req.files) {
    if (req.files.file) {
      req.body["image"] = shareSaveFile(req.files.file);
      next();
    } else {
      new Error("no file");
    }
  } else {
    next(new Error("No file"));
  }
};

const saveMultipleFile = (req, res, next) => {
  if (req.files) {
    if (req.files.files) {
      let imagePaths = [];
      for (let file of req.files.files) {
        imagePaths.push(shareSaveFile(file));
      }
      req.body["images"] = imagePaths;
      next();
    } else {
      new Error("no File");
    }
  } else {
    next(new Error("no files"));
  }
};

const deleteImageByName = (name) => {
  let imagepath = getFilePath(name);
  if (fs.existsSync(imagepath)) {
    fs.unlinkSync(imagepath);
  }
};

const deleteImageByLink = (link) => {
  let pathAry = link.split("/");
  let name = pathAry[pathAry.length - 1];
  deleteImageByName(name);
};

export {
  saveSingleFile,
  saveMultipleFile,
  deleteImageByLink,
  deleteImageByName,
};
