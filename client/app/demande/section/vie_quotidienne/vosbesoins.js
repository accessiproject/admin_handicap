'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.demande.vie_quotidienne';
    $stateProvider.state(index + '.vos_besoins', {
      url: '/vos_besoins',
      template: '<ui-view/>',
      controller: function ($scope) {
        $scope.helpTemplate = 'components/help/besoins.html';
      },
      abstract: true
    }).state(index + '.vos_besoins.quotidien', {
      url: '/quotidien',
      templateUrl: 'components/question/checkbox.html',
      controller: 'CheckboxQuestionCtrl',
      resolve: {
        question: function(QuestionService, request) {
          return QuestionService.get('vieQuotidienne', 'besoinsVie', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.deplacement');
          };
        }
      }
    }).state(index + '.vos_besoins.deplacement', {
      url: '/deplacement',
      templateUrl: 'components/question/checkbox.html',
      controller: 'CheckboxQuestionCtrl',
      resolve: {
        question: function(QuestionService, request) {
          return QuestionService.get('vieQuotidienne', 'besoinsDeplacement', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.transport');
          };
        }
      }
    }).state(index + '.vos_besoins.transport', {
      url: '/transport',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, request) {
          return QuestionService.get('vieQuotidienne', 'besoinsTransports', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.social');
          };
        }
      }
    }).state(index + '.vos_besoins.social', {
      url: '/social',
      templateUrl: 'components/question/checkbox.html',
      controller: 'CheckboxQuestionCtrl',
      resolve: {
        question: function(QuestionService, request) {
          return QuestionService.get('vieQuotidienne', 'besoinsSocial', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.lieu_de_vie');
          };
        }
      }
    }).state(index + '.vos_besoins.lieu_de_vie', {
      url: '/lieu_de_vie',
      templateUrl: 'components/question/checkbox.html',
      controller: 'CheckboxQuestionCtrl',
      resolve: {
        question: function(QuestionService, request) {
          return QuestionService.get('vieQuotidienne', 'besoinsLieuDeVie', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.^.vos_attentes.type_aide');
          };
        }
      }
    });
  });