// models/InventoryTransaction.js
import mongoose from 'mongoose';

const InventoryTransactionSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
  transactionType: { type: String, enum: ['IN', 'OUT'], required: true }, 
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  reference: { type: mongoose.Schema.Types.ObjectId, refPath: 'onModel' },
  onModel: { type: String, enum: ['PurchaseOrder', 'QualityControl'] },
});

const InventoryTransaction = mongoose.model('InventoryTransaction', InventoryTransactionSchema);
export default InventoryTransaction;
