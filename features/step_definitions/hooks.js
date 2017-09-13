
var { defineSupportCode } = require('cucumber');
var fetch = require('fetch-everywhere')

const url = "http://localhost:3000"

defineSupportCode(function ({ After, Before, BeforeAll}) {

	// Before( function() { 
	// 	return fetch(url + "/api/test-reset" ).then( (response) => response.json() ).then( (val) => {
	// 		return val.success
	// 		},
	// 	 (err) => {
	// 		console.log(err);
	// 		return false;
	// 	})
	// }) 

	Before( function( {sourceLocation} ) { 
		console.log( "\nRunning: " + sourceLocation.uri + " : " + sourceLocation.line)
	})

	After(function ( source) {
		return this.driver.quit();
	});
});