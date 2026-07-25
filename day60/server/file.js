require("dotenv").config();
const streamifier = require("streamifier");
const express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];

cloudinary.config({ cloud_name, api_key, api_secret });

const filter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file type: ${file.mimetype}. Only JPEG, PNG, and PDF are allowed.`,
      ),
      false,
    );
  }
};

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: filter,
});

const uploadToCloud = (buffer) => {
  return new Promise((resolve, reject) => {
    const mainUpload = cloudinary.uploader.upload_stream((error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    streamifier.createReadStream(buffer).pipe(mainUpload);
  });
};

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Upload File" });
    }

    const result = await uploadToCloud(req.file.buffer);

    const newAsset = await prisma.asset.create({
      data: {
        name: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url: result.secure_url,
      },
    });

    return res.status(200).json({ newAsset });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ multererr: err.message });
  } else {
    return res.status(400).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("App running on port 3000"));
