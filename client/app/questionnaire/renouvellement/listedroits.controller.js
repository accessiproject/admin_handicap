'use strict';

angular.module('impactApp')
  .controller('ListeDroitsCtrl', function($scope, $state, QuestionService, datepickerConfig, prestations) {
    if (!$scope.formAnswers.prestations) {
      $scope.formAnswers.prestations = {};
    }

    $scope.isLastQuestion = true;
    $scope.prestations = prestations;
    $scope.question = QuestionService.get('renouvellement', 'finDroits', $scope.formAnswers);
    datepickerConfig.datepickerMode = 'day';

    $scope.nextStep = function() {
      $scope.sectionModel.__completion = true;
      $state.go('departement.questionnaire');
    };
  });