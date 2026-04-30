const Product = require('../models/product');
const { logAudit } = require('../services/auditService');

// Get all products (active and inactive, though frontend can filter)
exports.getProducts = async (req, res) => {
  try {
    // Populate the category field to return full category objects
    const products = await Product.find().populate('category', 'name description').sort({ name: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching products', error: error.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, sku, category, supplier, unitOfMeasure, currentQuantity, lowStockThreshold, costPrice, description } = req.body;
    
    const existingSku = await Product.findOne({ sku: new RegExp('^' + sku + '$', 'i') });
    if (existingSku) {
      return res.status(400).json({ message: 'Product with this SKU already exists' });
    }

    const product = await Product.create({
      name, sku, category, supplier, unitOfMeasure, currentQuantity: currentQuantity || 0, lowStockThreshold: lowStockThreshold || 10, costPrice, description
    });

    await logAudit({
      userId: req.user.id,
      module: 'Product',
      action: 'CREATE',
      recordId: product._id,
      afterState: product
    });

    const populatedProduct = await Product.findById(product._id).populate('category', 'name description');
    
    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating product', error: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { name, sku, category, supplier, unitOfMeasure, lowStockThreshold, costPrice, description } = req.body;
    const productId = req.params.id;

    if (sku) {
      const existingSku = await Product.findOne({ 
        sku: new RegExp('^' + sku + '$', 'i'),
        _id: { $ne: productId }
      });
      if (existingSku) {
        return res.status(400).json({ message: 'Another product with this SKU already exists' });
      }
    }

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    
    const beforeState = JSON.parse(JSON.stringify(product));

    product.name = name || product.name;
    product.sku = sku || product.sku;
    product.category = category || product.category;
    product.supplier = supplier || product.supplier;
    product.unitOfMeasure = unitOfMeasure || product.unitOfMeasure;
    product.lowStockThreshold = lowStockThreshold !== undefined ? lowStockThreshold : product.lowStockThreshold;
    product.costPrice = costPrice !== undefined ? costPrice : product.costPrice;
    product.description = description || product.description;

    const updatedProduct = await product.save();

    await logAudit({
      userId: req.user.id,
      module: 'Product',
      action: 'UPDATE',
      recordId: updatedProduct._id,
      beforeState,
      afterState: updatedProduct
    });

    const populatedProduct = await Product.findById(updatedProduct._id).populate('category', 'name description');
    
    res.json(populatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating product', error: error.message });
  }
};

// Soft delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const beforeState = JSON.parse(JSON.stringify(product));
    product.isActive = false;
    const updatedProduct = await product.save();

    await logAudit({
      userId: req.user.id,
      module: 'Product',
      action: 'UPDATE',
      recordId: updatedProduct._id,
      beforeState,
      afterState: updatedProduct
    });

    const populatedProduct = await Product.findById(updatedProduct._id).populate('category', 'name description');
    
    res.json({ message: 'Product soft-deleted successfully', product: populatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting product', error: error.message });
  }
};

// Toggle product status (active/inactive)
exports.toggleProductStatus = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const beforeState = JSON.parse(JSON.stringify(product));
    product.isActive = !product.isActive;
    const updatedProduct = await product.save();

    await logAudit({
      userId: req.user.id,
      module: 'Product',
      action: 'UPDATE',
      recordId: updatedProduct._id,
      beforeState,
      afterState: updatedProduct
    });

    const populatedProduct = await Product.findById(updatedProduct._id).populate('category', 'name description');

    res.json(populatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error toggling product status', error: error.message });
  }
};
