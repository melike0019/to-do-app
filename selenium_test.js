const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTest() {
  const options = new chrome.Options();
  options.addArguments('--start-maximized');
  
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('http://localhost:3000');
    console.log('Uygulama açıldı');

    await driver.findElement(By.css('.category-input')).sendKeys('Test Kategori');
    await driver.findElement(By.css('.color-input')).sendKeys('#FF0000');
    await driver.findElement(By.css('.add-category-button')).click();
    console.log('Yeni kategori eklendi');

    await driver.wait(until.elementLocated(By.css('.category-item.active')), 5000);
    console.log('Kategori seçildi');

    await driver.findElement(By.css('.todo-input')).sendKeys('Test Todo');
    await driver.findElement(By.css('.add-button')).click();
    console.log('Yeni todo eklendi');

    await driver.wait(until.elementLocated(By.css('.todo-text')), 5000);
    const todoText = await driver.findElement(By.css('.todo-text')).getText();
    console.log('Todo metni:', todoText);

    await driver.findElement(By.css('.todo-text')).click();
    console.log('Todo tamamlandı olarak işaretlendi');

    const completedClass = await driver.findElement(By.css('.todo-text')).getAttribute('class');
    console.log('Todo durumu:', completedClass.includes('completed') ? 'Tamamlandı' : 'Tamamlanmadı');

    await driver.findElement(By.css('.delete-button')).click();
    console.log('Todo silindi');

    const todos = await driver.findElements(By.css('.todo-item'));
    console.log('Kalan todo sayısı:', todos.length);

    console.log('Tüm testler başarıyla tamamlandı!');
  } catch (error) {
    console.error('Test sırasında hata oluştu:', error);
  } finally {
    await driver.quit();
    console.log('Tarayıcı kapatıldı');
  }
}

runTest(); 