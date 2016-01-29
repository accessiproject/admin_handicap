'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'espace_perso.mes_profils.profil.vie_quotidienne.vos_besoins';
    $stateProvider.state(index, {
      url: '/vos_besoins',
      template: '<ui-view/>',
      controller: function($scope) {
        $scope.helpTemplate = 'components/help/besoins.html';
      },

      redirectTo: index + '.quotidien',
    }).state(index + '.quotidien', {
      url: '/quotidien',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, sectionModel) {
          return QuestionService.get(section, 'besoinsVie', sectionModel);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.deplacement');
          };
        }
      }
    }).state(index + '.deplacement', {
      url: '/deplacement',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, sectionModel) {
          return QuestionService.get(section, 'besoinsDeplacement', sectionModel);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.transport');
          };
        }
      }
    }).state(index + '.transport', {
      url: '/transport',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, sectionModel) {
          return QuestionService.get(section, 'besoinsTransports', sectionModel);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.social');
          };
        }
      }
    }).state(index + '.social', {
      url: '/social',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, sectionModel) {
          return QuestionService.get(section, 'besoinsSocial', sectionModel);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.^.vos_attentes.type_aide');
          };
        }
      }
    });
  });