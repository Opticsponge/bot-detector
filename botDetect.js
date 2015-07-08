'use strict';
var fs = require('fs');
// Read bot list from user-agents.org
var botlist = require('./botlist.json');
// Read custom bot list
var custombotlist = require('./custombotlist.json');

var ua_list = {};
var exports = module.exports = {};

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
  ua_list = botlist;
  for (var attrname in custombotlist) { 
    ua_list[attrname] = custombotlist[attrname]; 
  }
  callback(null);
}
// Added so that tests would wait until the bot list is loaded before executing
exports.loadBotList = loadBotList;

loadBotList(function() {
   uaCount(function(count) {
    console.log(count);
  });
});
