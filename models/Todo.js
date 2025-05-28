// Mongoose modülünü içe aktarıyoruz
const mongoose = require('mongoose');

// Todo şemasını tanımlıyoruz
const todoSchema = new mongoose.Schema({
  // Todo başlığı - zorunlu alan
  title: {
    type: String,
    required: true
  },
  // Todo açıklaması - opsiyonel alan
  description: {
    type: String,
    default: ''
  },
  // Tamamlanma durumu - varsayılan değer false
  completed: {
    type: Boolean,
    default: false
  },
  // Kategori referansı - opsiyonel alan
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  // Öncelik seviyesi - varsayılan değer 'normal'
  priority: {
    type: String,
    enum: ['low', 'normal', 'high'],
    default: 'normal'
  },
  // Bitiş tarihi - opsiyonel alan
  dueDate: {
    type: Date
  }
}, {
  timestamps: true // Otomatik olarak createdAt ve updatedAt alanlarını ekle
});

// Şemayı model olarak dışa aktarıyoruz
module.exports = mongoose.model('Todo', todoSchema); 