# bot-detector

Bot Detector is a simple npm plugin that fetches the list of bot user-agents from http://www.user-agents.org/allagents.xml .  It will return true if the string is a bot or false if it is not.

## Usage

var botDetect = require('../botDetect');

botDetect.isBot('user agent string');


