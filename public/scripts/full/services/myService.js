'use strict';

/*	------------------------------------
	myService.js
	------------------------------------ */

/* global tarotifyAppServices */
/* global console */

tarotifyAppServices.factory('myService', function() {
	return {
		sayHello: function() {
			console.log('Hello!');
		}
	};
});