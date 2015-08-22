'use strict';

/*	------------------------------------
	HomeCtrl.js
	------------------------------------ */

/* global tarotifyAppControllers */
/* global console */
/* global _ */
/* global $ */

tarotifyAppControllers.controller(
	'HomeCtrl',
	['$scope', '$rootScope', '$location', '$timeout', 'TarotService', 'LayoutManagerService', 'SettingsService',
	function($scope, $rootScope, $location, $timeout, TarotService, LayoutManagerService, SettingsService) {

	var default_layout = "Past, Present, Future";

	$scope.cards = TarotService.getCurrentCards();
	$scope.layoutData = LayoutManagerService.getCurrentLayout();
	$scope.showReversals = SettingsService.getAllowReversals();


	/**
		Only init cards and layout if it's a new game
		This check is done to prevent initialization
		when users navigate between views.
	**/
	if(TarotService.isNewGame()) {

		console.log('NEW READING');

		$scope.cards = [];
		LayoutManagerService.resetCurrentLayout();
		$scope.layoutData = LayoutManagerService.getCurrentLayout();

		/**
			Get Tarot card data from config file
		**/
		TarotService.initCards().then(function() {

			// Shuffle the cards
			TarotService.shuffleCards();

			// Randomly assign reversals
			TarotService.addReversals();

			// Assign cards to scope
			$scope.cards = TarotService.getCurrentCards();

			// console.log('Init Tarot cards.');
			// console.log('card scope data: ', $scope.cards);
		});


		/**
			Get layout data from config file
		**/
		LayoutManagerService.initLayouts().then(function() {

			// Set layout to default if it wasn't set already
			if($scope.layoutData === null)
				$scope.layoutData = LayoutManagerService.setLayout(default_layout);

			// console.log('Init layouts.');
			// console.log('layout scope data: ', $scope.layoutData);
		});

		$rootScope.$broadcast('NEW_READING');

		TarotService.setIsNewGame(false);
	}


	// Update scope cards when cards are told to shuffle
	$scope.$on('CARDS_SHUFFLED', function(event, data) {
		$scope.cards = TarotService.getCurrentCards();
		// console.log('card scope data: ', $scope.cards);
	});


	// Update scope cards when cards are told to shuffle
	$scope.$on('DREW_CARD', function(event, card) {

		console.log('Drew card -- ', card);

		// Update scope cards with cards from service
		$scope.cards = TarotService.getCurrentCards();

		// Find out next layout position to fill
		var num_grid_items = $scope.layoutData.grid_items.length;
		var next_num = 9999;
		for(var i = 0; i < num_grid_items; i++) {
			var gridItem = $scope.layoutData.grid_items[i];
			if(!gridItem.hasOwnProperty('card'))
				if(gridItem.num < next_num)
					next_num = gridItem.num;
		}
		console.log(next_num);
		// If there is a position to fill, set the card on it
		if(next_num !== 9999) {
			LayoutManagerService.setCardOnGridItem(card, next_num);

			// Update layout data on the scope
			$scope.layoutData = LayoutManagerService.getCurrentLayout();

			// It's bad to do it this way, but oh well!
			$timeout(function() {
				$('.tarot-card-' + next_num).addClass('fade-in');
			}, 5);
		}
	});


	// Take user to the card info screen when a card is clicked
	$scope.viewCard = function(infoUrl, reversed, position_description) {
		$rootScope.position_description = position_description;
		if(reversed && $scope.showReversals)
			$location.path('card/' + infoUrl + '/reversed');
		else
			$location.path('card/' + infoUrl);
	};

}]);