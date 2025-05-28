# Todo Uygulaması

Bu proje, React ve Node.js kullanılarak geliştirilmiş basit bir todo uygulamasıdır.

## Özellikler

- Todo ekleme
- Todo silme
- Todo'ları tamamlandı olarak işaretleme
- MongoDB veritabanı entegrasyonu

## Kurulum

### Gereksinimler

- Node.js
- MongoDB

### Backend Kurulumu

1. Proje dizininde terminal açın
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. MongoDB'yi başlatın
4. `.env` dosyasını oluşturun ve MongoDB bağlantı bilgilerinizi ekleyin:
   ```
   MONGODB_URI=mongodb://localhost:27017/todo-app
   PORT=5000
   ```
5. Sunucuyu başlatın:
   ```bash
   npm run dev
   ```

### Frontend Kurulumu

1. `client` dizinine gidin:
   ```bash
   cd client
   ```
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. Uygulamayı başlatın:
   ```bash
   npm start
   ```

## Kullanım

- Yeni todo eklemek için üst kısımdaki input alanını kullanın
- Todo'yu tamamlandı olarak işaretlemek için üzerine tıklayın
- Todo'yu silmek için "Sil" butonuna tıklayın

## Teknolojiler

- Frontend: React.js
- Backend: Node.js, Express.js
- Veritabanı: MongoDB
- HTTP İstemcisi: Axios

## Testler

### Frontend Testleri

Frontend bileşenleri için testler `client/src/components/__tests__` dizininde bulunmaktadır. Testleri çalıştırmak için:

1. `client` dizinine gidin:
   ```bash
   cd client
   ```
2. Testleri çalıştırın:
   ```bash
   npm test
   ```

### Backend Testleri

Backend fonksiyonları için testler `server.js` dosyasında bulunmaktadır. Testleri çalıştırmak için:

1. Proje kök dizininde terminal açın
2. Testleri çalıştırın:
   ```bash
   npm test
   ```

### Postman ile API Testleri

API endpoint'lerini test etmek için Postman koleksiyonu `postman_collection.json` dosyasında bulunmaktadır. Postman'i açın ve koleksiyonu içe aktararak testleri çalıştırın.

### Selenium ile Otomatik Test

Tarayıcı üzerinde uçtan uca (end-to-end) otomasyon testi için Selenium test senaryosu `selenium_test.js` dosyasında bulunmaktadır. Testi çalıştırmak için:

1. Gerekli paketleri yükleyin:
   ```bash
   npm install selenium-webdriver
   ```
2. Testi çalıştırın:
   ```bash
   node selenium_test.js
   ```

## Programın Çalıştırılması

### Backend Sunucusunu Başlatma

1. Proje kök dizininde terminal açın
2. Sunucuyu başlatın:
   ```bash
   npm run dev
   ```

### Frontend Uygulamasını Başlatma

1. `client` dizinine gidin:
   ```bash
   cd client
   ```
2. Uygulamayı başlatın:
   ```bash
   npm start
   ```

## Notlar

- Backend sunucusu varsayılan olarak `http://localhost:5000` adresinde çalışır.
- Frontend uygulaması varsayılan olarak `http://localhost:3000` adresinde çalışır.
- MongoDB'nin çalışır durumda olduğundan emin olun. 