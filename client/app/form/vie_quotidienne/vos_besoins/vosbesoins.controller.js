'use strict';

angular.module('impactApp')
  .controller('BesoinsVieCtrl', function ($scope) {

    if (angular.isUndefined($scope.sectionModel.besoins)) {
      $scope.sectionModel.besoins = {
        label: 'Besoins dans la vie quotidienne',
        answers: {}
      };
    }

    $scope.subSectionModel = $scope.sectionModel.besoins.answers;
  });