/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

// var expect = require('chai').expect;
// var MongoClient = require('mongodb');
// var ObjectId = require('mongodb').ObjectID;

// const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

const shortid = require('shortid');

let issues = [];

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      
    })
    
    .post(function (req, res){
      var project = req.params.project;
      let {issue_title, issue_text, created_by, assigned_to, status_text} = req.body;
      let newIssue = {
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
        created_on : new Date(), 
        updated_on : new Date(), 
        open: true,
        _id: shortid.generate()
      }
      issues.push(newIssue);
      res.json(newIssue);
    })
    
    .put(function (req, res){
    var project = req.params.project;
    let {_id, issue_title, issue_text, created_by, assigned_to, status_text, open} = req.body;
    const issueFound = issues.find(issue => issue._id === _id);
    if(!issueFound) {
       return res.json({
          error: "No issue found witht he given _id"
      })
    }
    console.log(issueFound);
    console.log(req.body);
    res.json(issueFound);
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
