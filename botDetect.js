var request = require('request');
var parseString = require('xml2js').parseString;

var url = 'http://www.user-agents.org/allagents.xml';

var ua_list = {};

module.exports = {
  updateXML: function(callback) {
    request(url, function (error, response, xml) {
      if (!error && response.statusCode == 200) {
        parseString(xml, function(err, result) {
          var list = JSON.stringify(result);
          var uas = result['user-agents']['user-agent'];
          uas.forEach(function(ua) {
            ua_list[ua['String'][0]] = 1;
            ua_list.push({
              agent_string: ua['String'][0],
              description: ua['Description'][0]
            });
          });
          callback();
        });
      }
    });
  },
  printList: function() {
    console.log(ua_list);
  },

  uaCount: function(callback) {
    callback(Object.keys(ua_list).length);
  },

  isBot: function(ua_string) {
    if (ua_list[ua_string]) {
      return true;
    }
    return false;
  }
}

updateXML();
