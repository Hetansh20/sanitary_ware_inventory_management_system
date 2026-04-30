const Supplier = require('../models/supplier');
const { logAudit } = require('../services/auditService');

const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({}).sort({ name: 1 });
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSupplier = async (req, res) => {
  try {
    const { name, contactPerson, email, phone, address, isActive } = req.body;
    
    const existing = await Supplier.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: 'Supplier with this name already exists' });
    }

    const supplier = await Supplier.create({
      name, contactPerson, email, phone, address, isActive
    });
    
    await logAudit({
      userId: req.user.id,
      module: 'Supplier',
      action: 'CREATE',
      recordId: supplier._id,
      afterState: supplier
    });

    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    const beforeState = JSON.parse(JSON.stringify(supplier));

    supplier.name = req.body.name || supplier.name;
    supplier.contactPerson = req.body.contactPerson || supplier.contactPerson;
    supplier.email = req.body.email || supplier.email;
    supplier.phone = req.body.phone || supplier.phone;
    supplier.address = req.body.address || supplier.address;
    
    if (req.body.isActive !== undefined) {
      supplier.isActive = req.body.isActive;
    }

    const updated = await supplier.save();

    await logAudit({
      userId: req.user.id,
      module: 'Supplier',
      action: 'UPDATE',
      recordId: updated._id,
      beforeState,
      afterState: updated
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    const beforeState = JSON.parse(JSON.stringify(supplier));
    supplier.isActive = false;
    const updated = await supplier.save();

    await logAudit({
      userId: req.user.id,
      module: 'Supplier',
      action: 'DELETE',
      recordId: updated._id,
      beforeState,
      afterState: updated
    });

    res.json({ message: 'Supplier deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier
};
