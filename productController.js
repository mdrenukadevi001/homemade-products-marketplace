const Product = require("../models/Product");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    // Get image paths from uploaded files
    const images = req.files.map(file => `/uploads/${file.filename}`);

    const newProduct = new Product({
      name,
      description,
      price,
      images,
      artisan: req.user._id,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created", product: newProduct });

  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated", product: updated });

  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });

  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
};
