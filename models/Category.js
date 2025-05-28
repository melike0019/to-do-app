// Mongoose modülünü içe aktarıyoruz
const mongoose = require('mongoose');

// Kategori şemasını tanımlıyoruz
const categorySchema = new mongoose.Schema({
  // Kategori adı alanı
  name: {
    type: String, // String tipinde
    required: true, // Zorunlu alan
    trim: true // Başındaki ve sonundaki boşlukları temizle
  },
  // Kategori rengi alanı
  color: {
    type: String, // String tipinde
    required: true // Zorunlu alan
  }
}, {
  timestamps: true // Otomatik olarak createdAt ve updatedAt alanlarını ekle
});

// Şemayı model olarak dışa aktarıyoruz
module.exports = mongoose.model('Category', categorySchema); 