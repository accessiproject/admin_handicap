'use strict';

angular.module('impactApp')
  .controller('SignupCtrl', function ($scope, $state, Auth, User) {
    $scope.user = {};
    $scope.errors = {};

    $scope.resetMongooseError = function(form, field) {
      form[field].$setValidity('mongoose', true);
    };

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          User.generateTokenForMail({email: $scope.user.email});
          $state.go('envoi_confirmation');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

  });
