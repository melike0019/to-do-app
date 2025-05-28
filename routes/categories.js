// Gerekli modülleri içe aktarıyoruz
const express = require('express'); // Express router için
const router = express.Router(); // Router oluşturuyoruz
const Category = require('../models/Category'); // Category modelini içe aktarıyoruz

// GET /api/categories - Tüm kategorileri getir
router.get('/', async (req, res) => {
  try {
    // Veritabanından tüm kategorileri çek ve isme göre sırala
    const categories = await Category.find().sort({ name: 1 });
    // Kategorileri JSON olarak gönder
    res.json(categories);
  } catch (err) {
    // Hata durumunda 500 hatası ve hata mesajını gönder
    res.status(500).json({ message: err.message });
  }
});

// POST /api/categories - Yeni kategori ekle
router.post('/', async (req, res) => {
  try {
    // Request body'den gelen verilerle yeni kategori oluştur
    const category = new Category({
      name: req.body.name,
      color: req.body.color || '#000000' // Renk belirtilmemişse siyah kullan
    });

    // Kategoriyi veritabanına kaydet
    const newCategory = await category.save();
    // Başarılı durumda 201 kodu ve yeni kategoriyi gönder
    res.status(201).json(newCategory);
  } catch (err) {
    // Hata durumunda 400 hatası ve hata mesajını gönder
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/categories/:id - Kategori sil
router.delete('/:id', async (req, res) => {
  try {
    // ID'ye göre kategoriyi bul
    const category = await Category.findById(req.params.id);
    if (!category) {
      // Kategori bulunamadıysa 404 hatası gönder
      return res.status(404).json({ message: 'Kategori bulunamadı' });
    }
    // Kategoriyi sil
    await category.deleteOne();
    // Başarılı silme mesajını gönder
    res.json({ message: 'Kategori silindi' });
  } catch (err) {
    // Hata durumunda 500 hatası ve hata mesajını gönder
    res.status(500).json({ message: err.message });
  }
});

// Router'ı dışa aktar
module.exports = router; 