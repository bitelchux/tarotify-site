'use strict';

/*	------------------------------------
	app.js
	------------------------------------ */

/* global angular */

// Declare app level module which depends on filters, and services
var tarotifyApp = angular.module('tarotifyApp', [
	'ngRoute',
	'ngAnimate',
	'tarotifyApp.filters',
	'tarotifyApp.services',
	'tarotifyApp.directives',
	'tarotifyApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'partials/home.html',
		controller: 'HomeCtrl'
	})
	.when('/about', {
		templateUrl: 'partials/about.html',
		controller: 'AboutCtrl'
	})
	.when('/card/Major-Arcana/:card/:reversed?', {
		templateUrl: 'partials/card_info.html',
		controller: 'CardInfoCtrl'
	})
	.when('/card/Minor-Arcana/:suite/:card/:reversed?', {
		templateUrl: 'partials/card_info.html',
		controller: 'CardInfoCtrl'
	})
	.when('/settings', {
		templateUrl: 'partials/settings.html',
		controller: 'SettingsCtrl'
	})
	.when('/help', {
		templateUrl: 'partials/help.html',
		controller: 'HelpCtrl'
	})
	.when('/new-reading', {
		templateUrl: 'partials/new.html',
		controller: 'NewCtrl'
	})
	.otherwise({ redirectTo: '/' });
}]);

var tarotifyAppFilters = angular.module('tarotifyApp.filters', []);
var tarotifyAppServices = angular.module('tarotifyApp.services', []);
var tarotifyAppDirectives = angular.module('tarotifyApp.directives', []);
var tarotifyAppControllers = angular.module('tarotifyApp.controllers', []);

// Application controller
// -- Handles global application state
tarotifyAppControllers.controller('AppCtrl', ['$rootScope', 'SettingsService', function($rootScope, SettingsService) {
	$rootScope.themeBg = SettingsService.getBackground().class;
	$rootScope.position_description = null;
}]);
