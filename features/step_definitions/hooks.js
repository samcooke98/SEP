
var { defineSupportCode } = require('cucumber');

defineSupportCode(function ({ After, Before }) {
	Before( function() { 

	}) 

	After(function () {
		// this.driver.get()
		return this.driver.quit();

	});
});