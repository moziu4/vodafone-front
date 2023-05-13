const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { VodafoneWorld } = require('../support/world');
const { World } = require('@cucumber/cucumber');

Given("I load Registros Page", async function (){
    const world = new VodafoneWorld();
    await world.load(); 
    await world.driver.get('http://localhost:3000');
})

Then ("Carga el titulo Registros", async function(){
    const world = new VodafoneWorld(); 
    await world.load(); 
    let element = await world.getAddElement(); 
    console.log(element);
})