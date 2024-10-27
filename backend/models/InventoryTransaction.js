// models/InventoryTransaction.js
import mongoose from 'mongoose';

const InventoryTransactionSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
  transactionType: { type: String, enum: ['IN', 'OUT'], required: true }, // 'IN' for received, 'OUT' for used or sold
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  reference: { type: mongoose.Schema.Types.ObjectId, refPath: 'onModel' }, // reference to QC or Order
  onModel: { type: String, enum: ['PurchaseOrder', 'QualityControl'] },
});

const InventoryTransaction = mongoose.model('InventoryTransaction', InventoryTransactionSchema);
export default InventoryTransaction;
