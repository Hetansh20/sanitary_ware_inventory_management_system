const { query } = require('../config/db');

const getInventory = async (req, res) => {
  try {
    const rows = await query(
      `SELECT
         ps.id AS id,
         ps.product_id AS productId,
         p.name AS productName,
         p.sku AS productSku,
         ps.warehouse_id AS warehouseId,
         w.name AS warehouseName,
         ps.quantity AS quantity,
         p.low_stock_threshold AS reorderLevel
       FROM product_stocks ps
       LEFT JOIN products p ON p.id = ps.product_id
       LEFT JOIN warehouses w ON w.id = ps.warehouse_id
       ORDER BY p.name ASC, w.name ASC`
    );

    const data = rows.map((r) => ({
      id: r.id,
      tileId: r.productId,
      tileName: r.productName,
      sku: r.productSku,
      warehouseId: r.warehouseId,
      warehouseName: r.warehouseName,
      quantityInStock: Number(r.quantity),
      reorderLevel: Number(r.reorderLevel || 0)
    }));

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getInventory };