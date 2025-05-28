// Gerekli modülleri içe aktarıyoruz
const express = require('express'); // Express router için
const router = express.Router(); // Router oluşturuyoruz
const Todo = require('../models/Todo'); // Todo modelini içe aktarıyoruz

// GET /api/todos - Tüm todo'ları getir
router.get('/', async (req, res) => {
  try {
    // Veritabanından tüm todo'ları çek, kategori bilgilerini populate et ve oluşturma tarihine göre sırala
    const todos = await Todo.find()
      .populate('category')
      .sort({ createdAt: -1 });
    // Todo'ları JSON olarak gönder
    res.json(todos);
  } catch (err) {
    // Hata durumunda 500 hatası ve hata mesajını gönder
    res.status(500).json({ message: err.message });
  }
});

// POST /api/todos - Yeni todo ekle
router.post('/', async (req, res) => {
  try {
    // Request body'den gelen verilerle yeni todo oluştur
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      priority: req.body.priority,
      dueDate: req.body.dueDate
    });

    // Todo'yu veritabanına kaydet
    const newTodo = await todo.save();
    // Başarılı durumda 201 kodu ve yeni todo'yu gönder
    res.status(201).json(newTodo);
  } catch (err) {
    // Hata durumunda 400 hatası ve hata mesajını gönder
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/todos/:id - Todo güncelle
router.patch('/:id', async (req, res) => {
  try {
    // ID'ye göre todo'yu bul
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      // Todo bulunamadıysa 404 hatası gönder
      return res.status(404).json({ message: 'Todo bulunamadı' });
    }

    // Güncellenecek alanları belirle
    if (req.body.title != null) todo.title = req.body.title;
    if (req.body.description != null) todo.description = req.body.description;
    if (req.body.completed != null) todo.completed = req.body.completed;
    if (req.body.category != null) todo.category = req.body.category;
    if (req.body.priority != null) todo.priority = req.body.priority;
    if (req.body.dueDate != null) todo.dueDate = req.body.dueDate;

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
    // ID'ye göre todo'yu bul
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      // Todo bulunamadıysa 404 hatası gönder
      return res.status(404).json({ message: 'Todo bulunamadı' });
    }
    // Todo'yu sil
    await todo.deleteOne();
    // Başarılı silme mesajını gönder
    res.json({ message: 'Todo silindi' });
  } catch (err) {
    // Hata durumunda 500 hatası ve hata mesajını gönder
    res.status(500).json({ message: err.message });
  }
});

// Router'ı dışa aktar
module.exports = router; 