const mongoose = require('mongoose');

const URI = 'mongodb+srv://chithanh:chithanh123@cluster0.pciov.mongodb.net/myFirstDatabase?retryWrites=true&w=majoritymongodb+srv://chithanh:chithanh123@cluster0.pciov.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI || URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(" Connect to DB")
}
module.exports = connectDB;