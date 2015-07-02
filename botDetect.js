'use strict';
var request = require('request');
var parseString = require('xml2js').parseString;
var fs = require('fs');

var url = 'http://www.user-agents.org/allagents.xml';

var ua_list = {};
var exports = module.exports = {};

// This can be called manually and piped into botlist.json to update the botlist
var updateXML = function(callback) {
  request(url, function (error, response, xml) {
    if (!error && response.statusCode == 200) {
      parseString(xml, function(err, result) {
        var uas = result['user-agents']['user-agent'];
        uas.forEach(function(ua) {
          ua_list[ua.String[0]] = 1;
        });
        console.log(JSON.stringify(ua_list));
        if (callback) {
          callback();
        }
      });
    }
  });
}
exports.updateXML = updateXML;

var printList = function() {
  console.log(ua_list);
}
exports.printList = printList;

var uaCount = function(callback) {
  callback(Object.keys(ua_list).length);
}
exports.uaCount = uaCount;

var isBot = function(ua_string) {
  if (ua_list[ua_string]) {
    return true;
  }
  return false;
}
exports.isBot = isBot;

var loadBotList = function(callback) {
  fs.readFile('botlist.json', 'utf-8',  function(err, data) {
    if (err) {
      callback(err); 
    }
    ua_list = JSON.parse(data);
    callback(null);
  });
}

loadBotList(function() {
   uaCount(function(count) {
    console.log(count);
  });
});
