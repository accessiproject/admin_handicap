'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('demande.questionnaire', {
        url: '/recapitulatif',
        templateUrl: 'app/demande/recapitulatif/recapitulatif.html',
        controller: 'RecapitulatifCtrl',
        authenticate: true
      });
  });