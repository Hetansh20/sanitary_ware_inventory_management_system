const AuditLog = require('../models/auditLog');

/**
 * Creates an audit log entry for sensitive actions
 * @param {Object} params
 * @param {String} params.userId - ID of the user performing the action
 * @param {String} params.module - 'User' | 'Product' | 'Supplier' | 'Order' | 'Category'
 * @param {String} params.action - 'CREATE' | 'UPDATE' | 'DELETE'
 * @param {String} params.recordId - ID of the record being modified
 * @param {Object} [params.beforeState] - Previous state of the record (null for CREATE)
 * @param {Object} [params.afterState] - New state of the record (null for DELETE)
 * @param {Object} [params.session] - Mongoose session if part of a transaction
 */
const logAudit = async ({ userId, module, action, recordId, beforeState = null, afterState = null, session = null }) => {
  try {
    const payload = {
      user: userId,
      module,
      action,
      recordId,
      beforeState: beforeState ? JSON.parse(JSON.stringify(beforeState)) : null,
      afterState: afterState ? JSON.parse(JSON.stringify(afterState)) : null,
    };

    if (session) {
      await AuditLog.create([payload], { session });
    } else {
      await AuditLog.create(payload);
    }
  } catch (error) {
    console.error('Audit Log Error:', error);
    // We intentionally don't throw the error so that an audit log failure 
    // doesn't completely crash a successful transaction, though in strict 
    // compliance systems you might want to throw here.
  }
};

module.exports = { logAudit };
