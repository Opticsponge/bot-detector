# bot-detector

Bot Detector is a simple npm plugin that fetches the list of bot user-agents from http://www.user-agents.org/allagents.xml .  It will return true if the string is a bot or false if it is not.

On require, it loads the XML from user-agents.org, which sometimes can take ~10 seconds

## Usage

var botDetect = require('../botDetect');

// ~10 seconds later

botDetect.isBot('user agent string');


