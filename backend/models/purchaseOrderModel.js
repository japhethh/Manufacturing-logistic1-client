import mongoose from 'mongoose';

const purchaseOrderSchema = mongoose.Schema({
  supplierName:{type:String,required:true},
  supplierPhone:{type:String, required:true},
  companyName:{type:String, required:true}, 
  deliveryDate:{type:Date}
});

const purchaseOrderModel = mongoose.model("PurchaseOrder", purchaseOrderSchema)

export default purchaseOrderModel;
