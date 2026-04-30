const Category = require('../models/category')
const { logAudit } = require('../services/auditService');

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching categories', error: error.message });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Check if category already exists
    const existingCategory = await Category.findOne({ name: new RegExp('^' + name + '$', 'i') });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category with this name already exists' });
    }

    const category = await Category.create({ name, description })

    await logAudit({
      userId: req.user.id,
      module: 'Category',
      action: 'CREATE',
      recordId: category._id,
      afterState: category
    })

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating category', error: error.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const categoryId = req.params.id;

    // Check if name is being changed to an existing name
    if (name) {
      const existingCategory = await Category.findOne({ 
        name: new RegExp('^' + name + '$', 'i'),
        _id: { $ne: categoryId }
      });
      if (existingCategory) {
        return res.status(400).json({ message: 'Another category with this name already exists' });
      }
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const beforeState = JSON.parse(JSON.stringify(category))
    
    category.name = name || category.name
    category.description = description !== undefined ? description : category.description

    const updatedCategory = await category.save()

    await logAudit({
      userId: req.user.id,
      module: 'Category',
      action: 'UPDATE',
      recordId: updatedCategory._id,
      beforeState,
      afterState: updatedCategory
    })

    res.json(updatedCategory)
  } catch (error) {
    res.status(500).json({ message: 'Server error updating category', error: error.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const beforeState = JSON.parse(JSON.stringify(category))
    await category.deleteOne()
    
    await logAudit({
      userId: req.user.id,
      module: 'Category',
      action: 'DELETE',
      recordId: req.params.id,
      beforeState
    })

    res.json({ message: 'Category removed' })
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting category', error: error.message });
  }
};
