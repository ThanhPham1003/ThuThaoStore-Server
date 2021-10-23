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


const usersRoute = require('../routes/users');
app.use('/users', usersRoute);


//app.use(middleware.decodeToken);


app.listen(port, () => {
  console.log('server is running in port 5000')
})