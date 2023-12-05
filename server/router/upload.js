import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const allowedFiletypes = /jpe?g|png|webp|gif/;
  const allowedMimetypes = /image\/jpe?g|image\/png|image\/webp|image\/gif/;

  const extname = allowedFiletypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedMimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Allowed image formats: jpeg, jpg, png, webp, gif"), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      res.status(400).send({ message: err.message });
    }

    let filePath = req.file.path.replace("\\", "/");

    res.status(200).send({
      message: "Image uploaded successfully",
      image: filePath,
    });
  });
});

export default router;
