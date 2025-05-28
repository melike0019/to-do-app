// Gerekli modülleri içe aktar
const express = require('express'); // Express framework
const mongoose = require('mongoose'); // MongoDB ODM
const cors = require('cors'); // CORS middleware
require('dotenv').config(); // .env dosyasından çevre değişkenlerini yükle

// Express uygulamasını oluştur
const app = express();

// Middleware'leri yapılandır
app.use(cors()); // CORS'u etkinleştir
app.use(express.json()); // JSON request body'lerini parse et

// MongoDB bağlantısını kur
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

// Route'ları tanımla
app.use('/api/todos', require('./routes/todos')); // Todo route'ları
app.use('/api/categories', require('./routes/categories')); // Kategori route'ları

// Ana route
app.get('/', (req, res) => {
  res.send('Todo API çalışıyor');
});

// Port'u belirle ve sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
}); 