'use strict';

/*	------------------------------------
	tarotService.js
	------------------------------------ */

/* global tarotifyAppServices */
/* global console */
/* global _ */

tarotifyAppServices.factory('TarotService', function($http, $q, $rootScope) {

	var _card_data_loaded = false;
	var _card_data = [];
	var _current_cards = [];
	var _d = $q.defer();

	return {

		initCards: function() {
			if(!_card_data_loaded) {
				$http({method: 'GET', url: 'config/card_data.json'}).
					success(function(data, status, headers, config) {
						_d.resolve(data);
						_card_data = data.card_data;
						_card_data_loaded = true;
						console.log('card_data: ', data);
					}).
					error(function(data, status, headers, config) {
						_d.reject(data);
						console.log('ERROR: ' + status + ': card_data: ', data);
					}
				);
			}
			return _d.promise;
		},

		shuffleCards: function() {
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

		getCards: function() {
			return _card_data;
		}
	};
});