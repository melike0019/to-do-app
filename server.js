const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Bağlantısı
mongoose.connect('mongodb://127.0.0.1:27017/todo-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB bağlantısı başarılı'))
.catch((err) => console.error('MongoDB bağlantı hatası:', err));

// Todo Model
const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Category Model
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        default: '#000000'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Todo = mongoose.model('Todo', todoSchema);
const Category = mongoose.model('Category', categorySchema);

// Routes
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/categories', async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
            color: req.body.color
        });
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/todos', async (req, res) => {
    try {
        const { sortBy, categoryId } = req.query;
        let query = {};
        
        if (categoryId) {
            query.category = categoryId;
        }

        let todos = await Todo.find(query).populate('category');
        
        if (sortBy === 'category') {
            todos.sort((a, b) => {
                if (!a.category) return 1;
                if (!b.category) return -1;
                return a.category.name.localeCompare(b.category.name);
            });
        } else {
            todos.sort((a, b) => b.createdAt - a.createdAt);
        }
        
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/todos', async (req, res) => {
    try {
        const todo = new Todo({
            text: req.body.text,
            category: req.body.categoryId
        });
        const newTodo = await todo.save();
        const populatedTodo = await Todo.findById(newTodo._id).populate('category');
        res.status(201).json(populatedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (todo) {
            todo.completed = !todo.completed;
            const updatedTodo = await todo.save();
            res.json(updatedTodo);
        } else {
            res.status(404).json({ message: 'Todo bulunamadı' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (todo) {
            await todo.deleteOne();
            res.json({ message: 'Todo silindi' });
        } else {
            res.status(404).json({ message: 'Todo bulunamadı' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});

// Test edilebilirlik için app nesnesini dışa aktarıyorum
module.exports = app; 