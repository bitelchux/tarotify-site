'use strict';

/*	------------------------------------
	settingsService.js
	------------------------------------ */

/* global tarotifyAppServices */
/* global console */
/* global localStorage */

tarotifyAppServices.factory('SettingsService', function() {

	var _backgrounds = [
		{
			"name": "Wood 1",
			"class": "wood1"
		},
		{
			"name": "Wood 2",
			"class": "wood2"
		},
		{
			"name": "Wood 3",
			"class": "wood3"
		},
		{
			"name": "Dark Stone",
			"class": "dark-stone"
		},
		{
			"name": "Lost Blue",
			"class": "lost-blue"
		}
	];

	var _background,
		_allow_reversals,
		_major_arcana_only;

		// First, grab settings if user had set them previously
	_background = localStorage.getItem('opt_background');
	_background = JSON.parse(_background);
	// Loop through backgrounds and reassign (weird bug fix)
	if(_background !== null)
		for(var i = 0; i < _backgrounds.length; i++)
			if(_background.class === _backgrounds[i].class)
				_background = _backgrounds[i];
	_allow_reversals = localStorage.getItem('opt_allow_reversals');
	_major_arcana_only = localStorage.getItem('opt_major_arcana_only');

	// Set defaults for all settings that aren't already set
	if(_background === null) _background = _backgrounds[1];
	if(_allow_reversals === null) _allow_reversals = 1;
	if(_major_arcana_only === null) _major_arcana_only = 0;

	return {
		setBackground: function(bg) {
			_background = bg;
			localStorage.setItem('opt_background', JSON.stringify(bg));
		},

		setAllowReversals: function(allowReversals) {
			_allow_reversals = (allowReversals) ? 1 : 0;
			localStorage.setItem('opt_allow_reversals', _allow_reversals);
		},

		setMajorArcanaOnly: function(majorArcanaOnly) {
			_major_arcana_only = (majorArcanaOnly) ? 1 : 0;
			localStorage.setItem('opt_major_arcana_only', _major_arcana_only);
		},

		getBackgrounds: function() {
			return _backgrounds;
		},

		getBackground: function() {
			return _background;
		},

		getAllowReversals: function() {
			return (_allow_reversals == 1) ? true : false;
		},

		getMajorArcanaOnly: function() {
			return (_major_arcana_only == 1) ? true : false;
		}
	};
});