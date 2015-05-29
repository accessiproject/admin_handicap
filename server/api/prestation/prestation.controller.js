'use strict';

var moment = require('moment');
var _ = require('lodash');
var DateUtils = require('../../components/dateUtils');
var Utils = require('./utils');
var Prestation = require('./prestation.constants');

var AAH = require('./aah');
var AEEH = require('./aeeh');
var AV = require('./av');
var CarteInvalidite = require('./carteInvalidite');
var CarteStationnement = require('./carteStationnement');
var EMS = require('./ems');
var ORP_RQTH = require('./orp_rqth');
var PCH = require('./pch');
var PPS = require('./pps');
var SMS = require('./sms');

var ou = Utils.ou;
var et = Utils.et;
var getValue = Utils.getValue;
var getValueList = Utils.getValueList;
var getSection = Utils.getSection;

var isAdult = DateUtils.isAdult;
var isLessThan = DateUtils.isLessThan;
var isMoreThan = DateUtils.isMoreThan;

function computeAnswers(answers) {
  // Shortcuts to sections
  var identites = getSection(answers, 'identites');
  var aidant = getSection(answers, 'aidant');
  var vieQuotidienne = getSection(answers, 'vie_quotidienne');
  var situationsParticulieres = getSection(answers, 'situations_particulieres');
  var vieAuTravail = getSection(answers, 'vie_au_travail');
  var vieScolaire = getSection(answers, 'vie_scolaire');

  // Shortcuts to answers
  var besoinsDeplacement = getValue(vieQuotidienne, 'besoinsDeplacement');
  var besoinsVie = getValue(vieQuotidienne, 'besoinsVie');
  var besoinsSocial = getValue(vieQuotidienne, 'besoinsSocial');
  var attentesTypeAide = getValue(vieQuotidienne, 'attentesTypeAide');
  var pensionInvalidite = getValue(vieQuotidienne, 'pensionInvalidite');
  var aideTechnique = getValue(vieQuotidienne, 'aideTechnique');
  var aidePersonne = getValue(vieQuotidienne, 'aidePersonne');
  var attentesVieScolaire = getValue(vieScolaire, 'attentesVieScolaire');
  var attentesAidant = getValue(aidant, 'typeAttente');
  var natureAideAidant = getValue(aidant, 'natureAide');
  var urgences = getValue(situationsParticulieres, 'urgences');
  var besoinSoutienAuTravail = getValue(vieAuTravail, 'besoinSoutien');
  var conservationTravail = getValue(vieAuTravail, 'conservation');

  // Initialize age variables
  var estAdulte = isAdult(answers);
  var aMoinsDe62Ans = isLessThan(answers, 62);
  var aPlusDe15Ans = isMoreThan(answers, 15);
  var aMoinsDe76Ans = isLessThan(answers, 76);
  var estEnfant = !estAdulte;

  var estNonActif = ou([
    false === getValue(vieAuTravail, 'conditionTravail'),
    et([
      getValue(vieAuTravail, 'conditionTravail'),
      false === getValue(vieAuTravail, 'temps'),
      false === getValue(vieAuTravail, 'adapte')
    ])
  ]);


  return {
    estAdulte: estAdulte,
    estEnfant: estEnfant,
    aMoinsDe62Ans: aMoinsDe62Ans,
    aPlusDe15Ans: aPlusDe15Ans,
    aMoinsDe76Ans: aMoinsDe76Ans,

    estNonActif: estNonActif,

    identites: identites,
    aidant: aidant,
    vieQuotidienne: vieQuotidienne,
    situationsParticulieres: situationsParticulieres,
    vieAuTravail: vieAuTravail,
    vieScolaire: vieScolaire,

    besoinsDeplacement: besoinsDeplacement,
    besoinsVie: besoinsVie,
    besoinsSocial: besoinsSocial,
    attentesTypeAide: attentesTypeAide,
    pensionInvalidite: pensionInvalidite,
    aideTechnique: aideTechnique,
    aidePersonne: aidePersonne,
    attentesVieScolaire: attentesVieScolaire,
    attentesAidant: attentesAidant,
    natureAideAidant: natureAideAidant,
    urgences: urgences,
    besoinSoutienAuTravail: besoinSoutienAuTravail,
    conservationTravail: conservationTravail
  }
}

function getCallbacks(answers) {

  var computed = computeAnswers(answers);

  var prestations = getSection(answers, 'prestations');
  function estRenouvellement(presta) {
    return prestations && prestations[presta.id];
  }

  return {
    aah: function() {
      return AAH.simulate(computed);
    },
    aeeh: function(droit) {
      return AEEH.simulate(computed);
    },
    av: function(droit) {
      return AV.simulate(computed);
    },
    carteInvalidite: function(droit) {
      return CarteInvalidite.simulate(computed);
    },
    carteStationnement: function(droit) {
      return CarteStationnement.simulate(computed);
    },
    ems: function(droit) {
      return EMS.simulate(computed);
    },
    orp: function(droit) {
      return ORP_RQTH.simulate(computed);
    },
    rqth: function(droit) {
      return ORP_RQTH.simulate(computed);
    },
    pch: function(droit) {
      return PCH.simulate(computed);
    },
    pps: function(droit) {
      return PPS.simulate(computed);
    },
    sms: function(droit) {
      return SMS.simulate(computed);
    },
    ac: function(droit) {
      return estRenouvellement(droit);
    }
  };
}

exports.simulate = function(answers) {
  var callbacks = getCallbacks(answers);

  var result = _.filter(Prestation.all, function(prestation) {
    var callback = callbacks[prestation.id];
    return callback && callback(prestation);
  });

  return result;
};

exports.index = function(req, res) {
  return res.json(Prestation.all);
};
