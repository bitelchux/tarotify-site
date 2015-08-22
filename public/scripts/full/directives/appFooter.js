'use strict';

/*	------------------------------------
	appFooter.js
	------------------------------------ */

/* global tarotifyAppDirectives */
/* global console */
/* global _ */

tarotifyAppDirectives.directive('appFooter', function($location) {
	return {
		restrict: 'E',
		templateUrl: 'partials/app_footer.html',
		controller: function($scope, TarotService, LayoutManagerService) {

			$scope.allPositionsFilled = false;

			$scope.shuffleCards = function() {
				TarotService.shuffleCards();
			};

			// Draw a random card from the deck
			$scope.drawCard = function() {
				var num_cards = TarotService.getCurrentCards().length;
				var available_positions = LayoutManagerService.getTotalAvailablePositions();

				// Only draw a card if their are available positions
				// left on the layout
				if(available_positions > 0) {
					var pick_card = _.random(0, num_cards - 1);
					TarotService.drawCard(pick_card);
				}

				// Since a card was removed, check available positions
				if(LayoutManagerService.getTotalAvailablePositions() === 0)
					$scope.allPositionsFilled = true;
			};

			// Reset button appearance for new readings
			$scope.$on('NEW_READING', function() {
				$scope.allPositionsFilled = false;
			});
		},
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