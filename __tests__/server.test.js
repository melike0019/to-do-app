// Backend API testleri için gerekli modülleri içe aktarıyoruz
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

// Test veritabanı bağlantısı
beforeAll(async () => {
    // Önce mevcut bağlantıyı kapat
    await mongoose.disconnect();
    // Test veritabanına bağlan
    await mongoose.connect('mongodb://127.0.0.1:27017/todo-app-test');
});

// Her testten sonra veritabanını temizle
afterEach(async () => {
    if (mongoose.connection.db) {
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
            await collection.deleteMany({});
        }
    }
});

// Tüm testler bittikten sonra bağlantıyı kapat
afterAll(async () => {
    await mongoose.disconnect();
});

// Kategori API Testleri
describe('Kategori API Testleri', () => {
    // Yeni kategori oluşturma testi
    test('POST /api/categories - Yeni kategori oluşturma', async () => {
        const response = await request(app)
            .post('/api/categories')
            .send({
                name: 'Test Kategori',
                color: '#FF0000'
            });
        
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe('Test Kategori');
        expect(response.body.color).toBe('#FF0000');
    });

    // Kategorileri listeleme testi
    test('GET /api/categories - Tüm kategorileri listeleme', async () => {
        // Önce bir kategori oluştur
        await request(app)
            .post('/api/categories')
            .send({
                name: 'Test Kategori',
                color: '#FF0000'
            });

        const response = await request(app)
            .get('/api/categories');
        
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBe(1);
        expect(response.body[0].name).toBe('Test Kategori');
    });
});

// Todo API Testleri
describe('Todo API Testleri', () => {
    let categoryId;

    // Her testten önce bir kategori oluştur
    beforeEach(async () => {
        const categoryResponse = await request(app)
            .post('/api/categories')
            .send({
                name: 'Test Kategori',
                color: '#FF0000'
            });
        categoryId = categoryResponse.body._id;
    });

    // Yeni todo oluşturma testi
    test('POST /api/todos - Yeni todo oluşturma', async () => {
        const response = await request(app)
            .post('/api/todos')
            .send({
                text: 'Test Todo',
                categoryId: categoryId
            });
        
        expect(response.statusCode).toBe(201);
        expect(response.body.text).toBe('Test Todo');
        expect(response.body.completed).toBe(false);
        expect(response.body.category._id).toBe(categoryId);
    });

    // Todoları listeleme testi
    test('GET /api/todos - Tüm todoları listeleme', async () => {
        // Önce bir todo oluştur
        await request(app)
            .post('/api/todos')
            .send({
                text: 'Test Todo',
                categoryId: categoryId
            });

        const response = await request(app)
            .get('/api/todos');
        
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBe(1);
        expect(response.body[0].text).toBe('Test Todo');
    });

    // Todo durumunu güncelleme testi
    test('PUT /api/todos/:id - Todo durumunu güncelleme', async () => {
        // Önce bir todo oluştur
        const todoResponse = await request(app)
            .post('/api/todos')
            .send({
                text: 'Test Todo',
                categoryId: categoryId
            });

        const todoId = todoResponse.body._id;

        const response = await request(app)
            .put(`/api/todos/${todoId}`);
        
        expect(response.statusCode).toBe(200);
        expect(response.body.completed).toBe(true);
    });

    // Todo silme testi
    test('DELETE /api/todos/:id - Todo silme', async () => {
        // Önce bir todo oluştur
        const todoResponse = await request(app)
            .post('/api/todos')
            .send({
                text: 'Test Todo',
                categoryId: categoryId
            });

        const todoId = todoResponse.body._id;

        const response = await request(app)
            .delete(`/api/todos/${todoId}`);
        
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Todo silindi');

        // Silinen todo'nun artık olmadığını kontrol et
        const getResponse = await request(app)
            .get('/api/todos');
        
        expect(getResponse.body.length).toBe(0);
    });
}); 