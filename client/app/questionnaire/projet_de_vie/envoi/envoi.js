'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.questionnaire.projet_de_vie.envoi';
    $stateProvider
      .state(index, {
        url: '/envoi',
        templateUrl: 'app/questionnaire/projet_de_vie/envoi/envoi.html',
        controller: 'EnvoiCtrl',
        resolve: {
          prestations: function($http) {
            return $http.get('/api/prestations').then(function(prestations) {
              return prestations.data;
            });
          }
        }
      }).state(index + '.modal', {
        abstract: true,
        onEnter: function($rootScope, $modal, $state, $window, RequestService) {
          $modal.open({
            template: '<div ui-view="modal"></div>',
            backdrop: true,
            windowClass: 'right fade',
            controller: 'ModalLoginCtrl'
          }).result.then(function() {
              RequestService.saveCurrent($rootScope);
          }, function() {
            $state.go('liste_demandes');
          });
        }
      });
  });
