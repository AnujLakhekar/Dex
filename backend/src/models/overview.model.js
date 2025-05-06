import mongoose from "mongoose"


const overviewSchema = new mongoose.Schema({ 
products: [
  {
    productId: {
    type: String,
    required: true,
    unique: true
  },
  name:{
    type: String,
    required: true,
    default: ""
  },
  imgUrl:{
    type: String,
    default: ""
  },
  price:{
    type: Number,
    default: 0
  },
  catagory:{
    type: String,
    default: ""
  },
  sales:{
    type: String,
    required: true,
    default: 0,
  },
  stock: {
    type: String,
    required: true,
    default: 0,
  }
  }
  ],
category: {
  type: String,
  default: 0,
},
users: {
  type: Number,
  default: 0,
},
stock: {
  type: Number,
  default: 0,
},
sales: {
  type: Number,
  default: 0,
},
saleGraph: [
	{ 
	name: {
	  type: String,
	  default : 0
	},
	sales: {
	  type: Number,
	  default : 0
	},
	},
],
},
{timestamps: true}
)


const Overview = mongoose.model("overview", overviewSchema);

export default Overview