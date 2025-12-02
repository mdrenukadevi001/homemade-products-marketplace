require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/handmade_marketplace';

app.use("/api/orders", orderRoutes);

mongoose.connect(MONGO, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error', err));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req,res)=> res.send('Handmade Marketplace Backend Running'));

app.listen(PORT, ()=> console.log('Server running on', PORT));
