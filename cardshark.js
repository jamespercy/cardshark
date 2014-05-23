var express = require('express');
var http = require('http');
var DOMParser = require('xmldom').DOMParser;
var _ = require('underscore')._;

var app = express();

app.get('/cards', function(req, res){
	var fetchedCards = [];
    console.log(req.query.card);
	var cerCardUrl = '/api/v2/projects/rec_registry_redesign/cards/';

	var options = {
	  host: 'mingle',
	  auth: 'james.percy:password1',
	  port: '8081'
	};
	
	function reportCards() {
		var report = '<pre>';
		_.each(fetchedCards, function(fc) {
			report = report 
			+ fc.type + '\t' 
			+ fc.properties['Bug Type'] + '\t' 
			+ fc.number + '\t' 
			+ fc.properties['Estimate'] + '\t' 
			+ fc.properties['Planning Feature'] + '\t' 
			+ fc.name + '\n'
		});
		report = report + '</pre>';
		console.log(report);
		return report;
	}

	var callback = function(response) {
	  var str = '';
	  //another chunk of data has been recieved, so append it to `str`
	  response.on('data', function (chunk) {
		str += chunk;
	  });
	  //the whole response has been recieved, so we just print it out here
	  response.on('end', function () {
		var card = parseText(str);
		console.log(card);
		fetchedCards.push(card);
		if (fetchedCards.length === req.query.card.length) {
			reportCards.sort();
			res.send(reportCards());
		}
	  });
	}

	//fetch the cards
	for (card in req.query.card) {
		console.log('requesting card: ' + cerCardUrl + req.query.card[card] + '.xml');
		options.path = cerCardUrl + req.query.card[card] + '.xml';
		http.request(options, callback).end();
	}
	
	var parseText = function(text) {
		function getProperties(xmlCard) {
		//'card/properties/property',
			var properties = {};
			var propertiesElement = xmlCard.getElementsByTagName('properties')[0];
			var propertyElements = propertiesElement.getElementsByTagName('property');
			for (var i = 0; i < propertyElements.length; i++) {
				var name = propertyElements[i].getElementsByTagName('name')[0].textContent;
				var valueElement = propertyElements[i].getElementsByTagName('value')[0].textContent;
				var value = (valueElement) ? valueElement.trim() : '';
				if (value) {
					properties[name] = value;
					console.log(name + ' = ' + value);
				}
			}
			console.log(JSON.stringify(properties));
			return properties;
		};

		var parser=new DOMParser();
		var xmlDoc=parser.parseFromString(text,"text/xml");
		var xmlCard = xmlDoc.getElementsByTagName('card')[0];
		var card = {};
		card.url = 'thecardsurl';
		card.number = xmlCard.getElementsByTagName('number')[0].textContent;
		card.name = xmlCard.getElementsByTagName('name')[0].textContent;
		card.type = xmlCard.getElementsByTagName('card_type')[0].getElementsByTagName('name')[0].textContent;
		card.properties = getProperties(xmlCard);
		return card;
	};

});

var server = app.listen(9000, function() {
    console.log('Listening on port %d', server.address().port);
});