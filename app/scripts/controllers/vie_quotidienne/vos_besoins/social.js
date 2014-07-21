'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:SocialCtrl
 * @description
 * # SocialCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('SocialCtrl', function($scope, $state) {

    $scope.subtitle = 'Besoin d\'aide dans vos relations sociales et familiales';

    if (angular.isUndefined($scope.subSectionModel.social)) {
      $scope.subSectionModel.social = {
        'besoins': {
          'proches': false,
          'loisirs': false,
          'famille': false,
          'citoyen': false,
          'autre': false
        },
        'detail': ''
      };
    }

    $scope.model = $scope.subSectionModel.social;
    $scope.question = {
      'model': 'besoins',
      'answers': [
        {'label': 'Pour les relations avec vos voisins, amis et votre famille', 'model': 'proches'},
        {'label': 'Pour avoir des activités culturelles, sportives et de loisirs', 'model': 'loisirs'},
        {'label': 'Pour vous occuper de votre famille', 'model': 'famille', 'onlyAdult': true},
        {'label': 'Pour vous accompagner dans votre vie citoyenne (ex: aller voter, vie associative ...)',
          'model': 'citoyen', 'onlyAdult': true},
        {'label': 'Autre besoin', 'model': 'autre', 'detail': true}
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.lieu_de_vie');
    };
  });