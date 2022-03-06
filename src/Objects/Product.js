const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  uid: {
    type: String,
    require: true,
  },
  tenSP: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
  giaNhap: {
    type: String,
    require: true,
  },
  giaBanLe: {
    type: String,
    require: true,
  },
  giaCTV: {
    type: String,
    require: true,
  },
  soluongNhap: {
    type: String,
    require: true,
  },
  soluongBanLe: {
    type: String,
    require: true,
  },
  soluongBanCTV: {
    type: String,
    require: true,
  },
  noiNhap: {
    type: String,
    require: true,
  },
  ngayDang: {
    type: String,
    require: true,
  },
  status:{
    type: String,
    required:true,
  },
  url:{
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('products', ProductSchema);