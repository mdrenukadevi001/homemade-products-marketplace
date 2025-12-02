const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req,res)=>{
  try{
    const {items} = req.body; // items: [{product, qty}]
    const populated = await Promise.all(items.map(async it=>{
      const p = await Product.findById(it.product);
      return {product:p._id, qty: it.qty, price: p.price};
    }));
    const total = populated.reduce((s,it)=> s + (it.price * it.qty), 0);
    const order = await Order.create({user: req.user._id, items: populated, total});
    res.json(order);
  }catch(e){res.status(500).json({message:e.message});}
};

exports.listOrders = async (req,res)=>{
  const orders = await Order.find({user: req.user._id}).populate('items.product');
  res.json(orders);
};
