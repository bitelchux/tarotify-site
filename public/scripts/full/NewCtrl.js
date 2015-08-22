'use strict';

/*	------------------------------------
	NewCtrl.js
	------------------------------------ */

/* global tarotifyAppControllers */
/* global console */
/* global confirm */

tarotifyAppControllers.controller('NewCtrl', ['$scope', '$location', 'TarotService', 'LayoutManagerService', function($scope, $location, TarotService, LayoutManagerService) {

	/**
		Get layout data from config file
	**/
	LayoutManagerService.initLayouts().then(function() {
		$scope.layouts = LayoutManagerService.getAllLayouts();
	});


	$scope.selectLayout = function(layoutName) {
		var startNewReading = function() {
			LayoutManagerService.setLayout(layoutName);
			TarotService.setIsNewGame(true);
			$location.path('/');
		};

		// Do not prompt user if layout is clear
		if(LayoutManagerService.getTotalAvailablePositions() === LayoutManagerService.getTotalPositions()) {
			startNewReading();
		}
		else {
			// Prompt user before starting new reading
			if(confirm('Starting a new reading will clear all cards. Are you sure?')) {
				startNewReading();
			}
		}
	};

}]);