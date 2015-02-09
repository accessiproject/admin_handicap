'use strict';

angular.module('impactApp')
  .controller('MonCompteCtrl', function($scope, User, Auth, datepickerConfig, currentUser) {
    $scope.errors = {};
    $scope.user = currentUser;

    datepickerConfig.datepickerMode = 'year';
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.changePassword = function(form) {
      $scope.passwordSubmitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.passwordMessage = 'Votre mot de passe a été modifié.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.password = 'Mot de passe incorrect';
          $scope.passwordMessage = '';
        });
      }
    };

    $scope.changePersonalInfo = function(form){

      if(form.$valid){
        $scope.user.$changeInfo(function(){
          $scope.infoMessage = 'Vos informations ont bien été modifiées.';
        });
      } else {
        $scope.infoMessage = 'Aucune information à changer.';
      }
    };
  });