'use strict';

/* jshint multistr: true */

var _ = require('lodash');
var os = require('os');
var fs = require('fs');
var path = require('path')
var async = require('async');
var moment = require('moment');
var mustache = require('mustache');

var Sections = require('../api/question/sections.constant');
var QuestionsBySections = require('../api/question/question.controller').questionsBySections;
var Identites = require('./identites');

var questionToHtml = function(answer, question, sectionId, request) {
  var html = '<div class="question">'

  html += '<h3>' + question.titleDefault + '</h3>';

  if (!question.answers) {
    console.log(question);
  } else {
    question.answers.forEach(function(constant) {
      if (answer[constant.model]) {
        html += '<p>' + constant.label + '</p>';
      }
    });
  }

  html += '</div>';

  return html;
};

var sectionToHtml = function(section, request) {
  var answers = request.formAnswers;

  if (section.id === 'identites') {
    return Identites.sectionToHtml(answers.identites);
  }

  if (section.id === 'documents') {
    return '';
  }

  var html = '<div class="section">'

  html += '<h2>' + section.label + '</h2>';

  var sectionAnswers = answers[section.id];
  var sectionQuestions = QuestionsBySections[section.id];

  if (!sectionAnswers) {
    return html + '<div class="question"><p>Section non renseignée</p></div>';
  }

  if (section.id === 'aidant' && !sectionAnswers.condition) {
    return html + '<p>Vous avez choisi de ne pas renseigner de détails sur votre aidant familial</p>';
  }

  sectionQuestions.forEach(function(question) {
    var answer = sectionAnswers[question.model];
    if (!answer) {
      return;
    }
    var questionHtml = questionToHtml(answer, question);
    if (questionHtml) {
      html += questionHtml + '<br>';
    }
  });

  return html + '</div>';
};

var renderTemplate = function(name, scope, templates) {
  fs.readFile(path.join(__dirname, name), function (err, html) {

  });
};

var readFile = function(name, callback) {
  fs.readFile(path.join(__dirname, name), function (err, html) {
    callback(err, String(html));
  });
}

exports.answersToHtml = function(request, path, next) {

  async.series({
    answersTemplate: function(callback){
      readFile('answers.html', callback);
    },
    sectionTemplate: function(callback){
      readFile('section.html', callback);
    }
  },
  function(err, results){
    if (err) { next(err); }
    var html = mustache.render(results.answersTemplate, {path: path, sections: Sections.all}, {section: results.sectionTemplate});
    next(null, html);
  });
};