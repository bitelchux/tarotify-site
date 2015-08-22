'use strict';

/*	------------------------------------
	appHeader.js
	------------------------------------ */

/* global tarotifyAppDirectives */

tarotifyAppDirectives.directive('appHeader', function($location) {
	return {
		restrict: 'E',
		templateUrl: 'partials/app_header.html',
		link: function(scope, element) {
			/**
				- Default to assuming that the user is on
				the homepage.
				- The 'Back' button should take the place
				of the standard icon buttons.
			**/
			scope.isHome = true;

			/**
				Listen for route changes and display the
				correct buttons.
			**/
			scope.$on('$routeChangeSuccess', function(event, current) {
				if($location.path() !== '/')
					scope.isHome = false;
				else
					scope.isHome = true;
			});
		}
	};
});