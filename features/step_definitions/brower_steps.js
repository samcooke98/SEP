var seleniumWebdriver = require('selenium-webdriver');
var { defineSupportCode } = require('cucumber');
var fetch = require('fetch-everywhere');
const url = "http://localhost:3000"

defineSupportCode(function ({ Given, When, Then }) {
	Given("I am on the {string} page", function (page) {
		return this.driver.get(url + page).then(() => {
			return this.driver.wait(seleniumWebdriver.until.urlIs(url + page))
		})
	})

	Given("I am on the landing page", function () {
		return this.driver.get(url + "/").then(() => {
			return this.driver.wait(seleniumWebdriver.until.urlIs(url + "/"))
		})
	})

	Given("I have an account called {string} with a password of {string}", (username, pass) => {
		return makeAdminAccount(username, pass).then((val) => {
			//console.log(val);
			logout()
		})
	})

	Given("is logged out", () => {
		return logout();
	})

	Given("I am logged in with {string} and {string}", function (username, pass) {
		return this.driver.get(url + "/login").then(() => {
			return this.driver.findElement({ name: "email" }).then((element) => element.sendKeys(username)).then(() => {
				return this.driver.findElement({ name: "password" }).then((element) => element.sendKeys(pass)).then(() => {
					return this.driver.findElement({ tagName: "button" }).then((element) => {
						element.click()
						return this.driver.wait(seleniumWebdriver.until.urlIs(url + '/feed'))

					})
				})
			})
		})
	});

	When('I put {string} in the field {string}', function (value, field) {
		return this.driver.findElement({ name: field }).then((element) => {
			return element.sendKeys(value);
		})
	});

	When('I submit the form', function () {
		return this.driver.findElement({ tagName: "form" }).then((element) => {
			//console.log("click");
			element.submit();
			this.driver.sleep(2000);
			return element;
		})
	})

	When('I click on {string}', function (text) {
		return this.driver.findElement({ linkText: text }).then(function (element) {
			return element.click();
		});
	});

	When('I click on {string} button', function (text) {
		return this.driver.findElement({name: text}).then(function (element) {
			return element.click();
		});
	});

	

	Then('I should see {string}', function (text) {
		var xpath = "//*[contains(text(),'" + text + "')]";
		var condition = seleniumWebdriver.until.elementLocated({ xpath: xpath });
		return this.driver.wait(condition, 5000);
	});

	Then('I should be redirected to {string}', function (string) {
		// Write code here that turns the phrase above into concrete actions
		return this.driver.wait(seleniumWebdriver.until.urlIs(url + string))
	});

	Then("I should be redirecred to the landing page", function () {
		return this.driver.get(url + "/").then(() => {
			return this.driver.wait(seleniumWebdriver.until.urlIs(url + "/"))
		})
	})

	Then("I should see an error", function () {

		//Tries to find a style containing "theme--error--"
		return this.driver.findElement({ css: '[class*="theme--error"]' })
		

	})

	Then("I should see no errors", function () {
		return this.driver.findElement({ css: '[class*="theme--error"]' }).catch(() => true).then(() => false, () => true)
	})



});

//https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/ie_exports_Driver.html#findElement

/* Helper functions */
const responseToBool = (response) => response.success

const post = (endpoint, body) => {
	//console.log("here");
	return fetch(url + "/api/" + endpoint, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'same-origin',
		body: JSON.stringify(body)
	}
	).then((response) => { return response.json() }) //console.log(response); return response.json() })
	.then((json) => { return json}) //console.log(json); return json })
}
const makeAdminAccount = (username, password) => {
	//console.log("HERE");
	var params = {
		username: username,
		password: password, passwordConfirm: password, firstName: "Admin", lastName: "Test", teamName: "Admin Team", teamDesc: "Test", category: "test"
	}
	return post("register", params).then((json) => { return json;}) //console.log(json); return json; })
}

const logout = () => {
	return fetch(url + '/api/logout', {
		credentials: 'same-origin',
	}).then((response) => response.json).then(responseToBool);
}

// const login = (username, pass) => post("login", {username: username, password: pass}).then(responseToBool)