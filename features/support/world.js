require('chromedriver')
var seleniumWebdriver = require('selenium-webdriver');
var { defineSupportCode } = require('cucumber');


//Headless Testing 
const chromeCapabilities = seleniumWebdriver.Capabilities.chrome();
chromeCapabilities.set('chromeOptions', {
	'args': [
		// '--headless',
	]
});

function CustomWorld() {
	this.driver = new seleniumWebdriver.Builder()
		.forBrowser('chrome')
		.withCapabilities(chromeCapabilities) //Disable this line to stop headless mode
		.build();
}

defineSupportCode(function ({ setWorldConstructor }) {
	setWorldConstructor(CustomWorld)
})


//Including this example in case you want to see a photo of a failed test or something.
// Take screenshot of results page. Save to disk.
// driver.takeScreenshot().then(base64png => {
//   fs.writeFileSync('screenshot.png', new Buffer(base64png, 'base64'));
// });