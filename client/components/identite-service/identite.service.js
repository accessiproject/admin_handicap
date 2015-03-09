'use strict';

angular.module('impactApp')
  .factory('IdentiteService', function IdentiteService() {
    var types = {
      beneficiaire: {
        title: 'Bénéficiaire',
        desc: 'Identité de la personne concernée par la demande'
      },
      autorite: {
        title: 'Autorité parentale',
        desc: 'Identité de l\'autorité parentale du bénéficiaire'
      },
      aidantDemarche: {
        title: 'Personne qui vous aide',
        desc: 'Identité de la personne vous aidant dans votre démarche'
      }
    };

    return {
      getDesc: function(type) {
        return types[type].desc;
      },
      getTitle: function(type) {
        return types[type].title;
      },
      getSref: function(type, id) {
        var sref = '.modification_identite({type: "' + type + '"';
        if (id) {
          sref += ', id: "' + id + '"';
        }
        sref += '})';
        return sref;
      },
      getIdentite: function(type, sectionModel, currentId) {
        switch (type) {
          case 'beneficiaire':
            return sectionModel.beneficiaire ? sectionModel.beneficiaire : {};
          case 'autorite':
            if (!sectionModel.autorite) {
              sectionModel.autorite = {};
            }

            if(!sectionModel.autorite[currentId]){
              sectionModel.autorite[currentId] = {};
            }

            return sectionModel.autorite[currentId];
          case 'aidantDemarche':
            if (!sectionModel.aidantDemarche) {
              sectionModel.aidantDemarche = [];
            }

            return sectionModel.aidantDemarche[currentId] || {};
        }
      },
      mergeModifications: function(type, sectionModel, currentId, tempIdentite) {
        switch (type) {
          case 'beneficiaire':
            sectionModel.beneficiaire = tempIdentite;
            break;
          case 'autorite':
            sectionModel.autorite[currentId] = tempIdentite;
            break;
          case 'aidantDemarche':
            if (currentId === sectionModel.aidantDemarche.length) {
              sectionModel.aidantDemarche.push(tempIdentite);
            } else {
              sectionModel.aidantDemarche[currentId] = tempIdentite;
            }
            break;
        }
      }
    };
  });