'use strict';
var fs = require('fs');

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
  // Read bot list from user-agents.org
  fs.readFile('botlist.json', 'utf-8',  function(err, data) {
    if (err) {
      callback(err); 
    }
    ua_list = JSON.parse(data);

    // Read custom botlist
    fs.readFile('customBotList.json', 'utf-8', function(err, data) {
      if (err) {
        callback(err); 
      }
      var customs = JSON.parse(data);
      for (var attrname in customs) { 
        ua_list[attrname] = customs[attrname]; 
      }
      callback(null);
    });
  });
}
// Added so that tests would wait until the bot list is loaded before executing
exports.loadBotList = loadBotList;

loadBotList(function() {
   uaCount(function(count) {
    console.log(count);
  });
});
