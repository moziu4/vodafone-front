const { Given , When, Then, After } = require("@cucumber/cucumber")
const assert = require("assert/strict")
const { By, until } = require("selenium-webdriver")

Given("I load Load Page", async function (){
    await this.load()
    await this.driver.get('http://localhost:3000/login')
    await this.driver.wait(until.elementLocated(By.id("login-titulo")))
})

When("I write {string} in input username", async function(username){
    const input = await this.getAddUsernameInput();
    await input.sendKeys(username)

})

When("I write {string} in input password", async function(password){
    const input = await this.getAddPasswordInput();
    await input.sendKeys(password)

})

When("Click on Button Iniciar Session", async function(){
    let botton = await this.driver.findElement(By.id("submitLogin"))
    await botton.click()
})

Then("Se crea un token en LocalStorage", async function (){
    const tokenValue = await this.getLocalStorageValue('token');
    assert.ok(tokenValue, 'No se ha creado un token en LocalStorage');
 })

Then("display message {string}", async function (text){
   let mensaje = await this.getTextAutenticando()
      assert.equal(mensaje, text)
   
})


