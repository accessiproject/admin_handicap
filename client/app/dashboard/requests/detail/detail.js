'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.requests.detail', {
        url: '/detail/:shortId',
        templateUrl: 'app/dashboard/requests/detail/detail.html',
        controller: function($scope, $state, $cookies, $window, request, user) {
          $scope.request = request;
          $scope.user = user;
          $scope.token = $cookies.get('token');

          $scope.back = function() {
            $window.history.back();
          };

          $scope.archive = function(request) {
            request.status = 'evaluation';
            request.$save(function() {
              $state.go('dashboard.requests', {}, {reload: true});
            });
          };

          $scope.supprimer = function(request) {
            request.$delete(function() {
              $state.go('dashboard.requests', {}, {reload: true});
            });
          };
        },

        resolve: {
          request: function($http, $stateParams, RequestResource) {
            return RequestResource.get({shortId: $stateParams.shortId}).$promise;
          },

          user: function($http, request) {
            return $http.get('api/users/' + request.user).then(function(result) {
              return result.data;
            });
          },

          prestations: function($http) {
            return $http.get('api/prestations').then(function(result) {
              return result.data;
            });
          },

          prestationsQuitus: function($http, $stateParams) {
            return $http.get('api/requests/' + $stateParams.shortId + '/simulation').then(function(result) {
              return result.data;
            });
          }
        },
        abstract: true,
        authenticate: true
      })
      .state('dashboard.requests.detail.pre_evaluation', {
        url: '/pre_evaluation',
        templateUrl: 'app/dashboard/requests/detail/pre_evaluation/pre_evaluation.html',
        controller: 'RequestPreEvaluationCtrl',
        resolve: {
          recapitulatif: function($http, $stateParams) {
            return $http.get('/api/requests/' + $stateParams.shortId + '/recapitulatif').then(function(request) {
              return request.data;
            });
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.detail.evaluation', {
        url: '/evaluation',
        templateUrl: 'app/dashboard/requests/detail/evaluation/evaluation.html',
        controller: 'RequestEvaluationCtrl',
        resolve: {
          sections: function(GevaService) {
            return GevaService.getSections();
          },

          model: function(GevaService) {
            return GevaService.getModel();
          }
        },
        authenticate: true
      })
      .state('dashboard.requests.detail.evaluation.section', {
        url: '/:sectionId',
        templateUrl: 'app/dashboard/requests/detail/evaluation/section/section.html',
        controller: 'RequestSectionCtrl',
        resolve: {
          section: function($stateParams, sections, model) {
            var id = $stateParams.sectionId;
            var section = _.find(sections, {id: id});

            return {
              id: section.id,
              label: section.label,
              trajectoires: model[section.label]
            };
          }
        },
        authenticate: true
      });
  });