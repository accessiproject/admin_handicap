'use strict';

angular.module('impactApp')
  .filter('actionTypeIconFilter', function(actionTypes) {
    return function(input) {
      return actionTypes[input.action].fa;
    };
  });
