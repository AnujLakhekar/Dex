import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
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
},
{timestamps: true}
)

const Product = mongoose.model("Products", ProductSchema);

export default Product