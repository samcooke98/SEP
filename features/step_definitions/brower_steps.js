var seleniumWebdriver = require('selenium-webdriver');
var { defineSupportCode } = require('cucumber');

const url = "http://localhost:3000"

defineSupportCode(function ({ Given, When, Then }) {
	Given("I am on the {string} page", function (page) {
		return this.driver.get(url + page)
	})

	When('I put {string} in the field {string}', function (value, field) {
		return this.driver.findElement({ name: field }).then((element) => {
			return element.sendKeys(value);
		})
	});

	When('I submit the form', function () {
		return this.driver.findElement({ tagName: "button" }).then((element) => {
			return element.click();
		})
	})

	Then('I should see confirmation', function () {
		// Write code here that turns the phrase above into concrete actions
		var xpath = "//*[contains(text(),'" + "Thanks for Joining" + "')]";
		var condition = seleniumWebdriver.until.elementLocated({ xpath: xpath });
		return this.driver.wait(condition, 5000);
	});

	Then("I should see {string}", function (string) {
		var xpath = "//*[contains(text(),'" + string + "')]";
		var condition = seleniumWebdriver.until.elementLocated({ xpath: xpath });
		return this.driver.wait(condition, 5000);
	})
});

//https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/ie_exports_Driver.html#findElement
