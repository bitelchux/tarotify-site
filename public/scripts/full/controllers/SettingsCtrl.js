'use strict';

/*	------------------------------------
	SettingsCtrl.js
	------------------------------------ */

/* global tarotifyAppControllers */
/* global console */
/* global confirm */

tarotifyAppControllers.controller('SettingsCtrl', ['$scope', '$rootScope', 'SettingsService', 'TarotService', function($scope, $rootScope, SettingsService, TarotService) {

	// Assign options to service values
	$scope.backgrounds = SettingsService.getBackgrounds();
	$scope.opt_showReversals = SettingsService.getAllowReversals();
	$scope.opt_majorArcanaOnly = SettingsService.getMajorArcanaOnly();

	$scope.opt_selectedBg = SettingsService.getBackground();

	$scope.selectBackground = function() {
		$rootScope.themeBg = $scope.opt_selectedBg.class;
		SettingsService.setBackground($scope.opt_selectedBg);
		console.log("Changed background to '" + $scope.opt_selectedBg.name + "'");
	};

	$scope.toggleReversals = function() {
		$scope.opt_showReversals = !$scope.opt_showReversals;
		SettingsService.setAllowReversals($scope.opt_showReversals);
	};

	$scope.toggleMajorArcana = function() {
		if(confirm('Clear all cards and apply this setting?')) {
			$scope.opt_majorArcanaOnly = !$scope.opt_majorArcanaOnly;
			SettingsService.setMajorArcanaOnly($scope.opt_majorArcanaOnly);
			TarotService.setIsNewGame(true);
		}
	};

}]);