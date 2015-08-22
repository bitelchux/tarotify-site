'use strict';

/*	------------------------------------
	tarotService.js
	------------------------------------ */

/* global tarotifyAppServices */
/* global console */
/* global _ */

tarotifyAppServices.factory('TarotService', function($http, $q, $rootScope, SettingsService) {

	var _card_data_loaded = false;
	var _new_game = true;
	var _all_cards = [];
	var _card_data = [];
	var _d = $q.defer();

	// Preload all tarot card images
	var _preloadImages = function() {
		for(var i = 0; i < _all_cards.length; i++)
			$http({method: 'GET', url: _all_cards[i].image_url});
	};

	return {

		initCards: function() {
			if(!_card_data_loaded) {
				$http({method: 'GET', url: 'config/card_data.json'}).
					success(function(data, status, headers, config) {
						_d.resolve(data);
						_all_cards = data.card_data;
						_card_data = _all_cards;
						_card_data_loaded = true;
						_preloadImages();
						// console.log('card_data: ', data);
					}).
					error(function(data, status, headers, config) {
						_d.reject(data);
						console.log('ERROR: ' + status + ': card_data: ', data);
					}
				);
			}
			return _d.promise;
		},

		shuffleCards: function(majorArcanaOnly) {
			// Filter out cards that are not part of 'Major Arcana'
			// only if the setting is ticked
			_card_data = _all_cards;
			if(SettingsService.getMajorArcanaOnly()) {
				_card_data = _.filter(_card_data, function(card) {
					return card.class === 'Major Arcana';
				});
			}
			_card_data = _.shuffle(_card_data);
			$rootScope.$broadcast('CARDS_SHUFFLED');
		},

		addReversals: function() {
			for(var i = 0; i < _card_data.length; i++) {
				var is_reversed = Math.floor(Math.random() * 2);
				is_reversed = (is_reversed === 0) ? false : true;
				_card_data[i].reversed = is_reversed;
			}
		},

		setIsNewGame: function(isNewGame) {
			_new_game = isNewGame;
		},

		drawCard: function(id) {
			// Get card
			var card = _card_data[id];
			// Remove card from deck
			_card_data.splice(id, 1);
			// Broadcast event that card was drawn
			$rootScope.$broadcast('DREW_CARD', card);
		},

		isNewGame: function() {
			return _new_game;
		},

		getCardByUrl: function(urlPath) {
			for(var i = 0; i < _all_cards.length; i++)
				if(_all_cards[i].url_path === urlPath)
					return _all_cards[i];
		},

		getCurrentCards: function() {
			return _card_data;
		}
	};
});