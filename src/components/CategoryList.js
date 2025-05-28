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
  Typography,
  Box
} from '@mui/material'; // Material-UI bileşenleri
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'; // Material-UI ikonları
import axios from 'axios'; // HTTP istekleri için axios

// CategoryList bileşeni
function CategoryList() {
  // State tanımlamaları
  const [categories, setCategories] = useState([]); // Kategori listesi
  const [open, setOpen] = useState(false); // Dialog açık/kapalı durumu
  const [editingCategory, setEditingCategory] = useState(null); // Düzenlenen kategori
  const [formData, setFormData] = useState({ // Form verileri
    name: '',
    color: '#000000'
  });

  // Kategorileri yükle
  useEffect(() => {
    fetchCategories();
  }, []);

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
  const handleOpen = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        color: category.color
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        color: '#000000'
      });
    }
    setOpen(true);
  };

  // Dialog'u kapat
  const handleClose = () => {
    setOpen(false);
    setEditingCategory(null);
  };

  // Form verilerini güncelle
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Kategori ekle/güncelle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        // Kategori güncelle
        await axios.patch(`http://localhost:5000/api/categories/${editingCategory._id}`, formData);
      } else {
        // Yeni kategori ekle
        await axios.post('http://localhost:5000/api/categories', formData);
      }
      handleClose();
      fetchCategories();
    } catch (error) {
      console.error('Kategori kaydedilirken hata:', error);
    }
  };

  // Kategori sil
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Kategori silinirken hata:', error);
    }
  };

  return (
    <Box>
      {/* Başlık ve yeni kategori butonu */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Kategoriler</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Yeni Kategori
        </Button>
      </Box>

      {/* Kategori listesi */}
      <List>
        {categories.map((category) => (
          <ListItem key={category._id}>
            {/* Kategori içeriği */}
            <ListItemText
              primary={category.name}
              sx={{
                '& .MuiListItemText-primary': {
                  color: category.color
                }
              }}
            />
            {/* Kategori işlem butonları */}
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleOpen(category)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDelete(category._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* Kategori ekleme/düzenleme dialog'u */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Kategori Adı"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="color"
            label="Renk"
            type="color"
            fullWidth
            value={formData.color}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button onClick={handleSubmit} color="primary">
            {editingCategory ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// CategoryList bileşenini dışa aktar
export default CategoryList; 