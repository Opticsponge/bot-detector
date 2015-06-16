'use strict';
var request = require('request');
var parseString = require('xml2js').parseString;

var url = 'http://www.user-agents.org/allagents.xml';

var ua_list = {};
var exports = module.exports = {};

var updateXML = function(callback) {
  request(url, function (error, response, xml) {
    if (!error && response.statusCode == 200) {
      parseString(xml, function(err, result) {
        var uas = result['user-agents']['user-agent'];
        uas.forEach(function(ua) {
          ua_list[ua.String[0]] = 1;
        });
        console.log("User-Agent list loaded");
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

updateXML();
