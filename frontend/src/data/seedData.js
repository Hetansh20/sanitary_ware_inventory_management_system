export const seedUsers = [
  { id: 1, name: "Aarav Sharma", email: "aarav@tileflow.com", role: "admin", isActive: true },
  { id: 2, name: "Nisha Patel", email: "nisha@tileflow.com", role: "staff", isActive: true },
  { id: 3, name: "Rohit Verma", email: "rohit@tileflow.com", role: "staff", isActive: false },
];

export const seedSuppliers = [
  {
    id: 1,
    name: "Classic Ceramics",
    contactPerson: "Neel Joshi",
    contactNumber: "+91 9876543210",
    email: "sales@classicceramics.in",
    address: "Plot 12, Industrial Estate, Morbi, Gujarat",
  },
  {
    id: 2,
    name: "StoneCraft Imports",
    contactPerson: "Pooja Nair",
    contactNumber: "+91 9988776655",
    email: "contact@stonecraft.co",
    address: "Warehouse Lane 4, Navi Mumbai, Maharashtra",
  },
  {
    id: 3,
    name: "Urban Surface Co.",
    contactPerson: "Arjun Rao",
    contactNumber: "+91 9123456780",
    email: "hello@urbansurface.com",
    address: "Block C, Bommasandra, Bengaluru, Karnataka",
  },
];

export const seedWarehouses = [
  {
    id: 1,
    name: "Central Warehouse",
    location: "Bengaluru East Hub, Whitefield",
    contactPerson: "Kunal Singh",
    contactNumber: "+91 9012345678",
  },
  {
    id: 2,
    name: "North Distribution",
    location: "Noida Sector 63, Uttar Pradesh",
    contactPerson: "Meera Das",
    contactNumber: "+91 9090909090",
  },
  {
    id: 3,
    name: "West Storage",
    location: "Bhiwandi Logistics Park, Maharashtra",
    contactPerson: "Rishi Kapoor",
    contactNumber: "+91 9345678123",
  },
];

export const seedTiles = [
  {
    id: 1,
    name: "Carrara Luxe",
    sku: "TL-CRL-6060",
    category: "Marble",
    size: "60x60",
    finish: "Polished",
    material: "Porcelain",
    color: "Pearl White",
    brand: "Astra",
    unitPrice: 95,
    supplierId: 1,
    isActive: true,
  },
  {
    id: 2,
    name: "Basalt Grid",
    sku: "TL-BSG-3030",
    category: "Outdoor",
    size: "30x30",
    finish: "Matte",
    material: "Ceramic",
    color: "Charcoal",
    brand: "StoneCraft",
    unitPrice: 70,
    supplierId: 2,
    isActive: true,
  },
  {
    id: 3,
    name: "Sahara Vein",
    sku: "TL-SHV-80120",
    category: "Granite",
    size: "80x120",
    finish: "Gloss",
    material: "Vitrified",
    color: "Sand Beige",
    brand: "Urban",
    unitPrice: 125,
    supplierId: 3,
    isActive: true,
  },
  {
    id: 4,
    name: "Nordic Oak",
    sku: "TL-NDO-2060",
    category: "Wood",
    size: "20x60",
    finish: "Textured",
    material: "Porcelain",
    color: "Oak Brown",
    brand: "Astra",
    unitPrice: 88,
    supplierId: 1,
    isActive: false,
  },
];

export const seedInventory = [
  { id: 1, tileId: 1, warehouseId: 1, quantityInStock: 210, reorderLevel: 70 },
  { id: 2, tileId: 1, warehouseId: 2, quantityInStock: 48, reorderLevel: 50 },
  { id: 3, tileId: 2, warehouseId: 1, quantityInStock: 35, reorderLevel: 40 },
  { id: 4, tileId: 3, warehouseId: 3, quantityInStock: 300, reorderLevel: 90 },
  { id: 5, tileId: 4, warehouseId: 2, quantityInStock: 14, reorderLevel: 25 },
];

export const seedTransactions = [
  {
    id: 1,
    type: "stock-in",
    tileId: 1,
    quantity: 120,
    reason: "Monthly supplier delivery",
    referenceId: "PO-1023",
    date: "2026-03-25",
    performedBy: "Admin User",
  },
  {
    id: 2,
    type: "stock-out",
    tileId: 2,
    quantity: 60,
    reason: "Retail shipment",
    referenceId: "SO-774",
    date: "2026-03-27",
    performedBy: "Staff User",
  },
  {
    id: 3,
    type: "damage",
    tileId: 4,
    quantity: 6,
    reason: "Transit breakage",
    referenceId: "DM-119",
    date: "2026-03-28",
    performedBy: "Admin User",
  },
  {
    id: 4,
    type: "transfer",
    tileId: 1,
    quantity: 30,
    reason: "Rebalance between warehouses",
    referenceId: "TR-440",
    date: "2026-03-29",
    performedBy: "Staff User",
  },
];

export const seedTransfers = [
  {
    id: 1,
    fromWarehouse: 1,
    toWarehouse: 2,
    tileId: 1,
    quantity: 30,
    status: "completed",
    createdAt: "2026-03-29",
  },
  {
    id: 2,
    fromWarehouse: 3,
    toWarehouse: 1,
    tileId: 3,
    quantity: 20,
    status: "pending",
    createdAt: "2026-04-01",
  },
];

export const seedOrders = [
  {
    id: 1,
    supplierId: 1,
    items: [{ tileId: 1, quantity: 100, unitPrice: 95 }],
    totalAmount: 9500,
    status: "pending",
    expectedDeliveryDate: "2026-04-08",
  },
  {
    id: 2,
    supplierId: 2,
    items: [{ tileId: 2, quantity: 180, unitPrice: 70 }],
    totalAmount: 12600,
    status: "received",
    expectedDeliveryDate: "2026-03-18",
  },
];

export const seedAlerts = [
  {
    id: 1,
    tileId: 1,
    warehouseId: 2,
    currentStock: 48,
    reorderLevel: 50,
    status: "open",
  },
  {
    id: 2,
    tileId: 4,
    warehouseId: 2,
    currentStock: 14,
    reorderLevel: 25,
    status: "open",
  },
  {
    id: 3,
    tileId: 2,
    warehouseId: 1,
    currentStock: 35,
    reorderLevel: 40,
    status: "resolved",
  },
];
