'use strict';


const { Builder, By, until, Key } = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;
const chrome = require('selenium-webdriver/chrome');
const { use } = require('chai');

describe('tooslQA test', function() {
    let driver;

    before(async function() {
        let service = new chrome.ServiceBuilder('chromedriver.exe').build();
        chrome.setDefaultService(service);

        driver = await new Builder().forBrowser('chrome').build();
    });

    after(function() {
        return driver.quit();
    });


    it("Verify homepage is open", async function(){
        await driver.get('https://demoqa.com/');
        expect(await driver.getCurrentUrl()).to.eq('https://demoqa.com/');
    })

    it("Opens Elements page", async function() {
        const elementsPage = await driver.findElement(
            By.xpath('//h5[contains(., "Elements")]/ancestor::div[contains(@class, "top-card")]')
        );
        await elementsPage.click();

        expect(await driver.getCurrentUrl()).to.eq('https://demoqa.com/elements');
        expect(await driver.findElement(By.className('main-header')).getText()).to.eq('Elements');
    });

    it("Go to the text box page", async function(){
        const textBox = await driver.findElement(By.id('item-0'));
        await textBox.click();
        expect(await driver.getCurrentUrl()).to.eq('https://demoqa.com/text-box');
        expect(await driver.findElement(By.className('main-header')).getText()).to.eq('Text Box');
    })

    it("Fill in the form and check submit button", async function(){
        const fullName = await driver.findElement(By.id('userName'));
        fullName.sendKeys('Negovan Milenkovic');
        const email = await driver.findElement(By.id('userEmail'));
        email.sendKeys('negovan@example.com');
        const currentAddress = await driver.findElement(By.id('currentAddress'));
        currentAddress.sendKeys('Mirka Milojkovica 21, 11060 Beograd');
        const permanentAddress = await driver.findElement(By.id('permanentAddress'));
        permanentAddress.sendKeys('Slanacki put 80, 11060 Beograd');
        const submitButton = await driver.findElement(By.id('submit'));
        await submitButton.click();

        const output = await driver.findElement(By.id('output'));
        expect(await output.isDisplayed()).to.eq(true);
        await driver.sleep(5000);
    })

    it("Go to the Buttons page", async function(){
        const button = await driver.findElement(By.id('item-4'));
        await button.click();
        expect(await driver.getCurrentUrl()).to.eq('https://demoqa.com/buttons');
        expect(await driver.findElement(By.className('main-header')).getText()).to.eq('Buttons');
    })

    it("Do the click on the 'Double click' button", async function(){
        const dbclick = await driver.findElement(By.id('doubleClickBtn'));
        await dbclick.click();
        await dbclick.click();
        await driver.sleep(5000);
       // expect(await driver.findElement(By.xpath('//*[@id="doubleClickMessage"]')));
    })

    /* it("Do the click on the 'Right click' button", async function(){
        const rightClick = await driver.findElement(By.id('rightClickBtn'));
        
    })

        it("Do the click on the 'Click me' button", async function(){
        const clickMe = await driver.findElement(By.xpath
        ('//div[@class="mt-4" and starts-with(., "Click Me")]'));
        await clickMe.click();
        await driver.sleep(5000);
        //expect(await driver.findElement(By.id('dynamicClickMessage')));
    })*/

});