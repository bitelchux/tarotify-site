'use strict';

/*	------------------------------------
	CardInfoCtrl.js
	------------------------------------ */

/* global tarotifyAppControllers */
/* global console */
/* global _ */

tarotifyAppControllers.controller('CardInfoCtrl', ['$scope', '$location', '$sce', '$routeParams', 'TarotService', function($scope, $location, $sce, $routeParams, TarotService) {

	$scope.card = {};
	$scope.isReversed = false;

	/**
		Get Tarot card data from config file
	**/
	TarotService.initCards().then(function() {

		// Get base route for tarot card lookup
		var route_path = $location.path();
		route_path = route_path.replace('/card/', '');
		route_path = route_path.replace('/reversed', '');

		$scope.card = TarotService.getCardByUrl(route_path);

		// Is this card reversed?
		if($routeParams.reversed === 'reversed')
			$scope.isReversed = true;

		$scope.card.meaning = $sce.trustAsHtml(String($scope.card.meaning));
		$scope.card.meaning_reversed = $sce.trustAsHtml(String($scope.card.meaning_reversed));
		$scope.card.description = $sce.trustAsHtml(String($scope.card.description));
		$scope.card.description_source = $sce.trustAsHtml(String($scope.card.description_source));

		console.log('Got card data: ', $scope.card);
	});

}]);