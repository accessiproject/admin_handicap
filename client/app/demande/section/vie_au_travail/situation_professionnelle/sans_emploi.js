'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.demande.vie_au_travail.situation_professionnelle.sans_emploi';
    $stateProvider
      .state(index , {
        url: '/sans_emploi',
        template: '<ui-view/>',
        abstract: true
      })
      .state(index + '.passe', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('travail', 'passe', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.pole_emploi');
            };
          }
        }
      })
      .state(index + '.pole_emploi', {
        url: '/pole_emploi',
        templateUrl: 'components/question/checkbox.html',
        controller: 'CheckboxQuestionCtrl',
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('travail', 'situationSansEmploi', request.formAnswers);
          },
          nextStep: function($state, sectionModel) {
            return function() {
              if (sectionModel.situationSansEmploi.stagiaire) {
                $state.go('^.stage');
              } else {
                $state.go('^.accompagnement');
              }
            };
          }
        }
      })
      .state(index + '.stage', {
        url: '/stage',
        templateUrl: 'components/question/textinput.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('travail', 'situationStage', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.accompagnement');
            };
          }
        }
      })
      .state(index + '.accompagnement', {
        url: '/accompagnement',
        templateUrl: 'components/question/checkbox.html',
        controller: 'CheckboxQuestionCtrl',
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('travail', 'situationAccompagnement', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.^.^.projet_professionnel.description');
            };
          }
        }
      });
  });