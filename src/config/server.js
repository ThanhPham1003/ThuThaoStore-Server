const express = require('express');
const {response} = require('express');
const app = express();
const cors = require("cors");
const middleware = require('../middleware');
const connectDB = require('../DB/Connection');

const port = 5000;

connectDB();
app.use(express.json({ extended: false }))

app.use(cors());

app.use('/uploads',express.static('uploads'))
app.use('/uploadUsers',express.static('uploadUsers'))
const usersRoute = require('../routes/users');
app.use('/users', usersRoute);

const productsRoute = require('../routes/products');
app.use('/products', productsRoute);

const clientsRoute = require('../routes/clients');
app.use('/clients', clientsRoute);

const ordersRoute = require('../routes/orders');
app.use('/orders', ordersRoute);

app.use(middleware.decodeToken);
app.get('', (req,res) => {
  res.send('Verified');
})

app.listen(port, () => {
  console.log('server is running in port 5000')
})