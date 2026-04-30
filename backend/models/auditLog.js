const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  module: {
    type: String,
    enum: ['User', 'Product', 'Supplier', 'Order', 'Category'],
    required: true
  },
  action: {
    type: String,
    enum: ['CREATE', 'UPDATE', 'DELETE'],
    required: true
  },
  recordId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  beforeState: {
    type: mongoose.Schema.Types.Mixed
  },
  afterState: {
    type: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);
