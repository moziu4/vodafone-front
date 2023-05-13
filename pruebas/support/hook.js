const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');

let driver;


Before(async function (scenario) {
    setDefaultTimeout(10 * 1000);
  
    const { Builder, By, Capabilities } = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    const chromedriver = require('chromedriver');
  
    const service = new chrome.ServiceBuilder(chromedriver.path);
    const chromeOptions = new chrome.Options().headless();
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeService(service)
      .withCapabilities(Capabilities.chrome())
      .setChromeOptions(chromeOptions)
      .build();
  
    if (!scenario.pickle.tags.includes('@skipLogin')) {
      await driver.get('http://localhost:3000/login');
      await driver.findElement(By.id('username')).sendKeys('jenita2');
      await driver.findElement(By.id('password')).sendKeys('12345');
      await driver.findElement(By.id('submitLogin')).click();
    }
  });

After({ tags: '@Login'}, async function () {
  await driver.quit();
});