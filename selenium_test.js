const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTest() {
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless())
    .build();

  try {
    // Uygulamayı aç
    await driver.get('http://localhost:3000');

    // Kategori ekleme
    await driver.findElement(By.css('input[placeholder="Yeni kategori ekle..."]')).sendKeys('Test Category');
    await driver.findElement(By.css('input[placeholder="Renk (örn: #ff0000)"]')).sendKeys('#ff0000');
    await driver.findElement(By.xpath("//button[text()='Kategori Ekle']")).click();
    await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Test Category')]")), 5000);

    // Todo ekleme
    await driver.findElement(By.css('input[placeholder="Yeni todo ekle..."]')).sendKeys('Test Todo');
    await driver.findElement(By.css('select')).click();
    await driver.findElement(By.xpath("//option[text()='Test Category']")).click();
    await driver.findElement(By.xpath("//button[text()='Ekle']")).click();
    await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Test Todo')]")), 5000);

    console.log('Test başarıyla tamamlandı!');
  } catch (error) {
    console.error('Test sırasında hata oluştu:', error);
  } finally {
    await driver.quit();
  }
}

runTest(); 