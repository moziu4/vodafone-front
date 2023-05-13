const {
    setWorldConstructor,
    World,
    setDefaultTimeout,
  } = require("@cucumber/cucumber");
  const { Builder, By, Capabilities, until } = require("selenium-webdriver");
  const chromedriver = require("chromedriver");
  const chrome = require("selenium-webdriver/chrome");

  class SharedContext {
    constructor() {
      this.loggedIn = false;
      this.username = '';
      this.password = '';
    }async login(username, password) {
        this.loggedIn = true;
        this.username = username;
        this.password = password;
      }
    }
  
  class VodafoneWorld extends World {
    constructor(options) {
      super(options);
      this.sharedContext = new SharedContext();
      this.driver = null; // Inicializar como nulo
      setDefaultTimeout(10 * 1000);
    }
  
    async load() {
      const service = new chrome.ServiceBuilder(chromedriver.path);
      let chromeOptions = new chrome.Options();
      if (this.parameters.headless) {
        chromeOptions = chromeOptions.headless();
      }
      this.driver = await new Builder()
        .forBrowser('chrome')
        .setChromeService(service)
        .withCapabilities(Capabilities.chrome())
        .setChromeOptions(chromeOptions)
        .build();
    }

    async performLogin(username, password) {
        await this.sharedContext.login(username, password);
      }

    async getLocalStorageValue(key) {
        return await this.driver.executeScript(
          `return window.localStorage.getItem('${key}');`
        );
      }
  
    async getAddUsernameInput() {
      return this.driver.findElement(By.id("username"));
    }

    async getAddPasswordInput() {
        return this.driver.findElement(By.id("password"));
      }
  
    async getAddElement() {
      return this.driver.findElement(By.id("tituloRegistros"));
    }

    async getTextAutenticando(){
       const message =  await this.driver.wait(until.elementLocated(By.name("autenticando")))
       const messageText = await message.getText()
       return messageText
    }
  
    async getTodoCountText() {
      return this.driver.findElement(By.id("todoCountText"));
    }
  
    async getTodoElementByText(text) {
      const todoElement = await this.driver.findElement(By.id("todoList"));
      const todoItemsElements = await todoElement.findElements(By.css("li"));
      for (let todoItem of todoItemsElements) {
        const textEle = await todoItem.findElement(By.id("text"));
        const eleText = await textEle.getText();
        if (eleText === text) {
          const actionBtn = await todoItem.findElement(By.id("actionBtn"));
          const id = await todoItem.getAttribute("id");
          return {
            textElement: todoItem,
            buttonElement: actionBtn,
            status: id === "pendingTodo" ? "pending" : "completed",
          };
        }
      }
    }

    async dispose() {
      if (this.driver) {
        await this.driver.quit();
        this.driver = null;
      }
    }
  }

  module.exports = {
    World: VodafoneWorld,
  }
  
  setWorldConstructor(VodafoneWorld);