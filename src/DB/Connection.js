const mongoose = require('mongoose');

const URI = 'mongodb+srv://chithanh:chithanh123@cluster0.pciov.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectDB = async () => {
  console.log('---- process.env.MONGODB_URI --- ', process.env.MONGODB_URI);
  await mongoose.connect(process.env.MONGODB_URI || URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(" Connect to DB")
}
module.exports = connectDB;