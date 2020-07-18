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
    console.log(req.body);
    if(!issueFound) {
       return res.json({
          error: "No issue found with the given _id",
      })
    }
    if(issue_title === "" && issue_text === "" && created_by === "" && assigned_to === "" && status_text === "") {
      res.send("No updated field sent");
    }
    else {
        issues = issues.map((issue) => issue._id === _id ? ({...issue, issue_title: issue_title === "" ? issue.issue_title : issue_title, issue_text: issue_text === "" ? issue.issue_text : issue_text, created_by: created_by === "" ? issue.created_by : created_by, assigned_to: assigned_to === "" ? issue.assigned_to : assigned_to, status_text: status_text === "" ? issue.status_text : status_text, open: open === undefined ? issue.open : open, updated_on : new Date()}): issue);
        res.send("Request Updated Sucessfully");
      console.log(issues);
      }
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
