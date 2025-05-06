import Overview from "../models/overview.model.js"
import Product from "../models/products.model.js"
import {v2 as cloudinary} from "cloudinary"

import { v4 as uuid } from 'uuid'; 

export const overviewController = async (req, res) => {
  try {
    const { category, users } = req.body;
    const productNumbers = await Product.find();
    
    const overviewDoc = await Overview.findOne();

     const products = productNumbers.length;
     const totalSales = productNumbers.reduce((acc, p) => acc + Number(p.sales), 0);
    
    const stock = productNumbers.reduce((acc, p) => acc + Number(p.stock), 0);

      overviewDoc.sales = totalSales;
      overviewDoc.stock = stock;
      overviewDoc.products = productNumbers.map((product) => ({
        productId: product.productId || "",
        imgUrl: product.imgUrl,
        name: product.name,
        price: product.price,
        sales: product.sales,
        stock: product.stock,
        catagory: product.catagory,
      }));
      
      console.log(overviewDoc.products)
      
       overviewDoc.saleGraph = productNumbers.map(product => ({
        name: product.name,
         sales: product.sales
}));
      
     await overviewDoc.save();

    res.status(200).json(overviewDoc);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
};

export const productsController = async (req, res) => {
  try {
    
    const {name, imgUrl, sales, stock, catagory, price} = req.body;
    
     let result;
  
    if (imgUrl) {
       result = await cloudinary.uploader.upload(imgUrl);
    }
    
    const createdLink = result.secure_url;
    
    const newProduct = new Product({
     productId: uuid(), name, imgUrl: createdLink, sales, stock, catagory, price
    })
    
    await newProduct.save();

    res.status(200).json(newProduct);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

export const deleteController = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findOne({productId});
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const publicId = product.imgUrl;
    console.log("Deleting image:", publicId);

    await cloudinary.uploader.destroy(publicId.split("/").pop().split(".")[0]);

    await Product.findByIdAndDelete(product._id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};
