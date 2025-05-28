// Gerekli modülleri içe aktarıyoruz
const express = require('express'); // Express router için
const router = express.Router(); // Router oluşturuyoruz
const Todo = require('../models/Todo'); // Todo modelini içe aktarıyoruz

// GET /api/todos - Tüm todo'ları getir
router.get('/', async (req, res) => {
  try {
    // Veritabanından tüm todo'ları çek ve kategori bilgilerini populate et
    const todos = await Todo.find().populate('categoryId');
    // Todo'ları JSON olarak gönder
    res.json(todos);
  } catch (err) {
    // Hata durumunda 500 hatası ve hata mesajını gönder
    res.status(500).json({ message: err.message });
  }
});

// POST /api/todos - Yeni todo ekle
router.post('/', async (req, res) => {
  // Request body'den gelen verilerle yeni todo oluştur
  const todo = new Todo({
    text: req.body.text,
    categoryId: req.body.categoryId
  });

  try {
    // Todo'yu veritabanına kaydet
    const newTodo = await todo.save();
    // Başarılı durumda 201 kodu ve yeni todo'yu gönder
    res.status(201).json(newTodo);
  } catch (err) {
    // Hata durumunda 400 hatası ve hata mesajını gönder
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/todos/:id - Todo durumunu güncelle
router.put('/:id', async (req, res) => {
  try {
    // ID'ye göre todo'yu bul
    const todo = await Todo.findById(req.params.id);
    // Tamamlanma durumunu tersine çevir
    todo.completed = !todo.completed;
    // Güncellenmiş todo'yu kaydet
    const updatedTodo = await todo.save();
    // Güncellenmiş todo'yu gönder
    res.json(updatedTodo);
  } catch (err) {
    // Hata durumunda 400 hatası ve hata mesajını gönder
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/todos/:id - Todo sil
router.delete('/:id', async (req, res) => {
  try {
    // ID'ye göre todo'yu bul ve sil
    await Todo.findByIdAndDelete(req.params.id);
    // Başarılı silme mesajını gönder
    res.json({ message: 'Todo silindi' });
  } catch (err) {
    // Hata durumunda 500 hatası ve hata mesajını gönder
    res.status(500).json({ message: err.message });
  }
});

// Router'ı dışa aktar
module.exports = router; 