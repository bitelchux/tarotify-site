'use strict';

/*	------------------------------------
	layoutManagerService.js
	------------------------------------ */

/* global tarotifyAppServices */
/* global console */
/* global angular */
/* global _ */

tarotifyAppServices.factory('LayoutManagerService', function($http, $q, $rootScope) {

	var _layout_data_loaded = false;
	var _layout_data = null;
	var _original_layout = null;
	var _current_layout = null;
	var _d = $q.defer();

	return {

		initLayouts: function() {
			// if(!_layout_data_loaded) {
				$http({method: 'GET', url: 'config/layouts.json'}).
					success(function(data, status, headers, config) {
						_d.resolve(data);
						_layout_data = data.layout_data;
						_layout_data_loaded = true;
						// console.log('layouts: ', data);
					}).
					error(function(data, status, headers, config) {
						_d.reject(data);
						console.log('ERROR: ' + status + ': layouts: ', data);
					}
				);
			// }
			return _d.promise;
		},

		setLayout: function(layoutName) {
			console.log("Getting layout data for '" + layoutName + "'");
			_current_layout = _.filter(_layout_data, function(layout) {
				return layout.name === layoutName;
			})[0];
			_original_layout = angular.copy(_current_layout);
			return _current_layout;
		},

		setCardOnGridItem: function(card, nextNum) {
			var num_grid_items = _current_layout.grid_items.length;
			for(var i = 0; i < num_grid_items; i++)
				if(_current_layout.grid_items[i].num === nextNum) {
					_current_layout.grid_items[i].card = card;
				}
		},

		resetCurrentLayout: function() {
			_current_layout = angular.copy(_original_layout);
		},

		getCurrentLayout: function() {
			return _current_layout;
		},

		getAllLayouts: function() {
			return _layout_data;
		},

		getTotalPositions: function() {
			var total_positions = 0;
			var num_grid_items = _current_layout.grid_items.length;
			for(var i = 0; i < num_grid_items; i++)
				if(_current_layout.grid_items[i].hasOwnProperty('num'))
					total_positions++;
			return total_positions;
		},

		getTotalAvailablePositions: function() {
			var available_positions = 0;
			var num_grid_items = _current_layout.grid_items.length;
			for(var i = 0; i < num_grid_items; i++)
				if(_current_layout.grid_items[i].hasOwnProperty('card'))
					available_positions++;
			return this.getTotalPositions() - available_positions;
		}
	};
});