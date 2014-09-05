'use strict';

angular.module('impactApp')
  .controller('SituationScolaireCtrl', function ($scope) {

    if (angular.isUndefined($scope.sectionModel.situation)) {
      $scope.sectionModel.situation = {
        label: 'Votre situation',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.sectionModel.situation.answers;
  });