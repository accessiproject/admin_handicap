'use strict';

var _ = require('lodash');
var Secteur = require('./secteur.model');
var Request = require('../request/request.model');
var Mdph = require('../mdph/mdph.model');

exports.index = function(req, res) {
  Secteur
    .find({mdph: req.user.mdph})
    .sort('name')
    .populate('evaluators.enfant evaluators.adulte')
    .exec(function(err, secteurs) {
      if (err) { return handleError(req, res, err); }

      return res.json(secteurs);
    });
};

exports.show = function(req, res) {
  Secteur
    .findById(req.params.id)
    .populate('evaluators.enfant evaluators.adulte')
    .exec(function(err, secteur) {
    if (err) { return handleError(req, res, err); }

    if (!secteur) { return res.sendStatus(404); }

    return res.json(secteur);
  });
};

var update = function(req, res) {
  Secteur.findById(req.params.id, function(err, secteur) {
    if (err) { return handleError(req, res, err); }

    if (!secteur) { return res.sendStatus(404); }

    secteur
      .set('name', req.body.name)
      .set('evaluators', req.body.evaluators)
      .set('default', req.body.default)
      .set('updatedAt', Date.now())
      .save(function(err) {
        if (err) { return handleError(req, res, err); }

        return res.status(200).json(secteur);
      });
  });
};

exports.update = update;

// Creates a new partenaire in the DB.
exports.create = function(req, res) {
  if (req.body._id) {
    return update(req, res);
  } else {
    Secteur.create(req.body, function(err, secteur) {
      if (err) { return handleError(req, res, err); }

      return res.status(201).json(secteur);
    });
  }
};

// Deletes a partenaire from the DB.
exports.destroy = function(req, res) {
  Secteur.findById(req.params.id).remove().exec(function(err) {
    if (err) { return handleError(req, res, err); }

    return res.sendStatus(204);
  });
};

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}

function buildQuery(params, query, mdph) {

  var result = {
    status: query && query.status ? query.status : 'emise',
    mdph: mdph.zipcode
  };

  if (params.id !== 'autres') {
    result.secteur = params.id;
  } else {
    result.secteur = {$eq: null};
  }

  return result;
}

exports.listRequests = function(req, res) {
  Mdph.findById(req.user.mdph, function(err, mdph) {
    if (err) return handleError(req, res, err);
    if (!mdph) return res.sendStatus(404);

    var query = buildQuery(req.params, req.query, mdph);

    Request
      .find(query)
      .select('user shortId formAnswers.identites status submittedAt evaluator')
      .populate('user evaluator', 'name')
      .sort('-submittedAt')
      .exec(function(err, requests) {
        if (err) return handleError(req, res, err);

        return res.send(requests);
      });
  });
};

exports.countRequests = function(req, res) {
  Mdph.findById(req.user.mdph, function(err, mdph) {
    if (err) return handleError(req, res, err);
    if (!mdph) return res.sendStatus(404);

    var query = buildQuery(req.params, req.query, mdph);
    Request
      .count(query)
      .exec(function(err, result) {
        if (err) return handleError(req, res, err);

        return res.json(result);
      });
  });
};
