import mongoose from 'mongoose';

const rawmaterialSchema = mongoose.Schema({
  requestData:{
    type:Date,
    default:Date.now
  },
  requestStatus:{
    type:String,
    enum:['Pending','Approved','Rejected'], 
    default:'Pending'
  },
  requestedBy:{
    type:String,
    required:true
  },
  material:[{
    materialName:String,
    materialId:{
      type:mongoose.Schema.Types.ObjectId, 
      ref:"Material"},
    quantity:Number,
    unit:String,
  }
],
  priority:{
    type:String,
    enum:['High','Medium','Low'],
    default:'Medium'
  },
  financeApproval:{
    type:Boolean,
    default:false
  }
});

  const rawmaterialModel = mongoose.model('RawmaterialRequest',rawmaterialSchema);


  export default rawmaterialModel;