// Mongoose modülünü içe aktarıyoruz
const mongoose = require('mongoose');

// Todo şemasını tanımlıyoruz
const todoSchema = new mongoose.Schema({
  // Todo metni alanı
  text: {
    type: String, // String tipinde
    required: true, // Zorunlu alan
    trim: true // Başındaki ve sonundaki boşlukları temizle
  },
  // Tamamlanma durumu alanı
  completed: {
    type: Boolean, // Boolean tipinde
    default: false // Varsayılan değer: false
  },
  // Kategori referansı alanı
  categoryId: {
    type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId tipinde
    ref: 'Category', // Category modeline referans
    required: true // Zorunlu alan
  }
}, {
  timestamps: true // Otomatik olarak createdAt ve updatedAt alanlarını ekle
});

// Şemayı model olarak dışa aktarıyoruz
module.exports = mongoose.model('Todo', todoSchema); 