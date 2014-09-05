'use strict';

angular.module('impactApp')
  .controller('ParticulieresCtrl', function ($scope) {

    if ($scope.estRepresentant()) {
      $scope.subtitle ='Se trouve-t-il dans une des situations suivantes ?';
    } else {
      $scope.subtitle ='Vous trouvez-vous dans une des situations suivantes ?';
    }

    if (angular.isUndefined($scope.sectionModel.urgences)) {
      $scope.sectionModel.urgences = {
        urgences: {},
        detail: ''
      };
    }

    $scope.model = $scope.sectionModel.urgences;
    $scope.question = {
      model: 'urgences',
      answers:
      [
        {
          label: 'Vous n\'arrivez plus à vivre chez vous',
          labelRep: $scope.getPronoun(true) + ' n\'arrive plus à vivre à domicile',
          model: 'domicile',
          detail: true,
          detailUrl: 'components/detail/precisez_big.html',
          placeholder: 'Expliquez la difficulté'
        },
        {
          label: 'Votre établissement ne peux plus vous acceuillir et vous ne pouvez pas retourner chez vous',
          labelRep: 'Son établissement ne peux plus l\'acceuillir et ' + $scope.getPronoun() + ' ne peut pas retourner chez ' + $scope.getPronounTonic(),
          model: 'etablissement',
          detail: true,
          detailUrl: 'components/detail/precisez_big.html',
          placeholder: 'Expliquez la difficulté'
        },
        {
          label: 'Votre école ne peux plus vous acceuillir',
          labelRep: 'Son école ne peux plus l\'acceuillir',
          detail: true,
          detailUrl: 'components/detail/precisez_big.html',
          placeholder: 'Expliquez la difficulté',
          model: 'ecole'
        },
        {
          label: 'Vous risquez de perdre votre travail',
          labelRep: $scope.getPronoun(true) + ' risque de perdre son travail',
          detail: true,
          detailUrl: 'components/detail/precisez_big.html',
          placeholder: 'Expliquez la difficulté',
          model: 'travail'
        },
        {
          label: 'Vous commencez bientôt une nouvelle formation',
          labelRep: $scope.getPronoun(true) + ' commence bientôt une nouvelle formation',
          detail: true,
          detailUrl: 'components/detail/precisez_date.html',
          detailLabel: 'Date d\'entrée prévue',
          model: 'formation'
        }
      ]
    };

    $scope.nextStep = function() {
      $scope.$storage.sectionVieQuotidienne.isEnabled = true;
      $scope.goToNextSection($scope.currentSection);
    };
  });