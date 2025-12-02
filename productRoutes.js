const express = require("express");
const multer = require("multer");
const path = require("path");
const protect = require("../middleware/auth");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, upload.array("images", 5), createProduct); // Allow up to 5 images
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
