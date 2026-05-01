const Warehouse = require('../models/warehouse');

exports.getWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find({ isActive: true }).sort({ name: 1 });
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching warehouses', error: error.message });
  }
};

exports.createWarehouse = async (req, res) => {
  try {
    const { name, location, contactPerson, contactNumber } = req.body;
    
    const existing = await Warehouse.findOne({ name: new RegExp('^' + name + '$', 'i') });
    if (existing) {
      return res.status(400).json({ message: 'Warehouse with this name already exists' });
    }

    const warehouse = new Warehouse({
      name,
      location,
      contactPerson,
      contactNumber
    });

    await warehouse.save();
    res.status(201).json(warehouse);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating warehouse', error: error.message });
  }
};

exports.updateWarehouse = async (req, res) => {
  try {
    const { name, location, contactPerson, contactNumber } = req.body;
    const warehouseId = req.params.id;

    if (name) {
      const existing = await Warehouse.findOne({ 
        name: new RegExp('^' + name + '$', 'i'),
        _id: { $ne: warehouseId }
      });
      if (existing) {
        return res.status(400).json({ message: 'Another warehouse with this name already exists' });
      }
    }

    const warehouse = await Warehouse.findByIdAndUpdate(
      warehouseId,
      { name, location, contactPerson, contactNumber },
      { returnDocument: 'after', runValidators: true }
    );

    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }

    res.json(warehouse);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating warehouse', error: error.message });
  }
};

exports.deleteWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { returnDocument: 'after' }
    );
    
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }

    res.json({ message: 'Warehouse soft-deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting warehouse', error: error.message });
  }
};
