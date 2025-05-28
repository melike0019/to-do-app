// Gerekli modülleri içe aktar
import React from 'react'; // React kütüphanesi
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // React Router
import { Container } from '@mui/material'; // Material-UI bileşenleri
import Navbar from './components/Navbar'; // Navbar bileşeni
import TodoList from './components/TodoList'; // TodoList bileşeni
import CategoryList from './components/CategoryList'; // CategoryList bileşeni

// Ana uygulama bileşeni
function App() {
  return (
    // Router bileşeni ile uygulamayı sarmala
    <Router>
      {/* Navbar bileşenini göster */}
      <Navbar />
      {/* Ana içerik container'ı */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {/* Route'ları tanımla */}
        <Routes>
          {/* Ana sayfa - Todo listesi */}
          <Route path="/" element={<TodoList />} />
          {/* Kategoriler sayfası */}
          <Route path="/categories" element={<CategoryList />} />
        </Routes>
      </Container>
    </Router>
  );
}

// App bileşenini dışa aktar
export default App; 