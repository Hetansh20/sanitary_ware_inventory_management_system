const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  module: {
    type: String,
    required: true,
    index: true
  },
  action: {
    type: String,
    enum: ['CREATE', 'UPDATE', 'DELETE'],
    required: true
  },
  targetId: {
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

// Ensure immutability at the schema level (append-only)
auditLogSchema.pre('save', function() {
  if (!this.isNew) {
    throw new Error('Audit logs cannot be modified');
  }
});
auditLogSchema.pre('updateOne', function() { throw new Error('Audit logs cannot be modified'); });
auditLogSchema.pre('updateMany', function() { throw new Error('Audit logs cannot be modified'); });
auditLogSchema.pre('findOneAndUpdate', function() { throw new Error('Audit logs cannot be modified'); });
auditLogSchema.pre('deleteOne', function() { throw new Error('Audit logs cannot be deleted'); });
auditLogSchema.pre('deleteMany', function() { throw new Error('Audit logs cannot be deleted'); });
auditLogSchema.pre('findOneAndDelete', function() { throw new Error('Audit logs cannot be deleted'); });

module.exports = mongoose.model('AuditLog', auditLogSchema);
