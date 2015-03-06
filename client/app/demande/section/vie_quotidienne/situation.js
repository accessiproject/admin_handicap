'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.demande.vie_quotidienne';
    $stateProvider
      .state(index + '.situation', {
        url: '/situation',
        template: '<ui-view/>',
        abstract: true
      })
      .state(index + '.situation.vie_famille', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        data: {
          hideBack: true
        },
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'famille', request.formAnswers);
          },
          nextStep: function($state, sectionModel, question) {
            return function() {
              if (sectionModel[question.model] === 'etablissement') {
                $state.go('^.^.vos_besoins.quotidien');
              } else {
                $state.go('^.logement');
              }
            };
          }
        }
      })
      .state(index + '.situation.logement', {
        url: '/logement',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'logement', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.aides');
            };
          }
        }
      })
      .state(index + '.situation.aides', {
        url: '/aides',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request, section) {
            return QuestionService.get(section, 'aideActuelle', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.^.vos_besoins.quotidien');
            };
          }
        }
      });
  });
