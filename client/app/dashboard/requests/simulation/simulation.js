'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.requests.simulation', {
        url: '/simulation',
        templateUrl: 'app/dashboard/requests/simulation/simulation.html',
        controller: 'SimulationCtrl',
        authenticate: true
      });
  });
