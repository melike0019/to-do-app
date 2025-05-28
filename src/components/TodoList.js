// Gerekli modülleri içe aktar
import React, { useState, useEffect } from 'react'; // React hooks
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box
} from '@mui/material'; // Material-UI bileşenleri
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'; // Material-UI ikonları
import axios from 'axios'; // HTTP istekleri için axios

// TodoList bileşeni
function TodoList() {
  // State tanımlamaları
  const [todos, setTodos] = useState([]); // Todo listesi
  const [categories, setCategories] = useState([]); // Kategori listesi
  const [open, setOpen] = useState(false); // Dialog açık/kapalı durumu
  const [editingTodo, setEditingTodo] = useState(null); // Düzenlenen todo
  const [formData, setFormData] = useState({ // Form verileri
    title: '',
    description: '',
    category: '',
    priority: 'normal',
    dueDate: ''
  });

  // Todoları ve kategorileri yükle
  useEffect(() => {
    fetchTodos();
    fetchCategories();
  }, []);

  // Todoları API'den çek
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Todolar yüklenirken hata:', error);
    }
  };

  // Kategorileri API'den çek
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Kategoriler yüklenirken hata:', error);
    }
  };

  // Dialog'u aç
  const handleOpen = (todo = null) => {
    if (todo) {
      setEditingTodo(todo);
      setFormData({
        title: todo.title,
        description: todo.description || '',
        category: todo.category?._id || '',
        priority: todo.priority || 'normal',
        dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
      });
    } else {
      setEditingTodo(null);
      setFormData({
        title: '',
        description: '',
        category: '',
        priority: 'normal',
        dueDate: ''
      });
    }
    setOpen(true);
  };

  // Dialog'u kapat
  const handleClose = () => {
    setOpen(false);
    setEditingTodo(null);
  };

  // Form verilerini güncelle
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Todo ekle/güncelle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTodo) {
        // Todo güncelle
        await axios.patch(`http://localhost:5000/api/todos/${editingTodo._id}`, formData);
      } else {
        // Yeni todo ekle
        await axios.post('http://localhost:5000/api/todos', formData);
      }
      handleClose();
      fetchTodos();
    } catch (error) {
      console.error('Todo kaydedilirken hata:', error);
    }
  };

  // Todo sil
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Todo silinirken hata:', error);
    }
  };

  // Todo tamamlandı durumunu değiştir
  const handleToggleComplete = async (todo) => {
    try {
      await axios.patch(`http://localhost:5000/api/todos/${todo._id}`, {
        completed: !todo.completed
      });
      fetchTodos();
    } catch (error) {
      console.error('Todo durumu güncellenirken hata:', error);
    }
  };

  return (
    <Box>
      {/* Başlık ve yeni todo butonu */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Todolar</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Yeni Todo
        </Button>
      </Box>

      {/* Todo listesi */}
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo._id}
            button
            onClick={() => handleToggleComplete(todo)}
            sx={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              bgcolor: todo.completed ? 'action.hover' : 'background.paper'
            }}
          >
            {/* Todo içeriği */}
            <ListItemText
              primary={todo.title}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.primary">
                    {todo.description}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="text.secondary">
                    Kategori: {todo.category?.name || 'Kategorisiz'}
                  </Typography>
                  {todo.dueDate && (
                    <Typography component="span" variant="body2" color="text.secondary">
                      {' | Bitiş: '}
                      {new Date(todo.dueDate).toLocaleDateString()}
                    </Typography>
                  )}
                </>
              }
            />
            {/* Todo işlem butonları */}
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={(e) => { e.stopPropagation(); handleOpen(todo); }}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={(e) => { e.stopPropagation(); handleDelete(todo._id); }}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* Todo ekleme/düzenleme dialog'u */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingTodo ? 'Todo Düzenle' : 'Yeni Todo'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Başlık"
            type="text"
            fullWidth
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Açıklama"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Kategori</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <MenuItem value="">Kategorisiz</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Öncelik</InputLabel>
            <Select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <MenuItem value="low">Düşük</MenuItem>
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="high">Yüksek</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="dueDate"
            label="Bitiş Tarihi"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.dueDate}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button onClick={handleSubmit} color="primary">
            {editingTodo ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// TodoList bileşenini dışa aktar
export default TodoList; 