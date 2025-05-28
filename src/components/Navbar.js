// Gerekli modülleri içe aktar
import React from 'react'; // React kütüphanesi
import { AppBar, Toolbar, Typography, Button } from '@mui/material'; // Material-UI bileşenleri
import { Link } from 'react-router-dom'; // React Router link bileşeni

// Navbar bileşeni
function Navbar() {
  return (
    // Üst çubuk bileşeni
    <AppBar position="static">
      {/* Toolbar içeriği */}
      <Toolbar>
        {/* Uygulama başlığı */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todo Uygulaması
        </Typography>
        {/* Navigasyon butonları */}
        <Button color="inherit" component={Link} to="/">
          Todolar
        </Button>
        <Button color="inherit" component={Link} to="/categories">
          Kategoriler
        </Button>
      </Toolbar>
    </AppBar>
  );
}

// Navbar bileşenini dışa aktar
export default Navbar; 