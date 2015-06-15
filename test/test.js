var should = require('chai').should(),
    botDetect = require('../botDetect');

before(function(done) {
	// remove database data here
	botDetect.updateXML(function() {
		done();
	});
}) 

describe('updateXML', function() {
  it('fetches the xml file', function(done) {
  	botDetect.uaCount(function(count) {
  	 	count.should.be.above(2000);
  	 	done();
  	});
  });
});

describe('botDetection', function() {
	it('test a positive detection', function() {
		botDetect.isBot('!Susie (http://www.sync2it.com/susie)')
			.should.be.true;
	});

	it ('tests a negative detection', function() {
		botDetect.isBot('Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev> (KHTML, like Gecko) Chrome/<Chrome Rev> Mobile Safari/<WebKit Rev>')
			.should.be.false;

	});
});