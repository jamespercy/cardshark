var cardshark = angular.module('cardshark', []);

cardshark.controller('InputController', function InputController($scope) {
	var cerCardUrl = '/api/v2/projects/rec_registry_redesign/cards/';
	var username = 'james.percy';
	var password = 'password1';
	var host = 'mingle';
	var port = '8081';

	$scope.cards = [];
	$scope.fetchCards = function() {
		var cardNumbersToFetch = prepareNumbers($scope.cardString.split(','));
		var fetchedCards = fetchCardsFromMingle(cardNumbersToFetch);

		var fetchCardsFromMingle = function(numberStrings) {
			numberStrings.forEach(fetchCard)
			var fetchCardFromMingle = function(card) {
				var request = new XMLHttpRequest();
				request.open("GET", cerCardUrl + card + '.xml', false, username, password);
			}
		};
	}

	$scope.remove = function(cardNumber) {
		console.log('removing ' + cardNumber);
	};


	var prepareNumbers = function(numberStrings) {
		numberStrings.forEach(function(element, index) {
			numberStrings[index] = element.trim();
		});
		return numberStrings;
	}
});




	// $scope.parseNumbers = function() {
	// 	var file = fileInput.files[0];
	// 	var textType = /text.*/;
	// 	function parseFile(text) {
	// 		function getProperties(xpath, doc) {
	// 			var properties = {};
	// 			var propertyElements =  doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE,null);
	// 			var propElement = propertyElements.iterateNext();
	// 			while (propElement) {
	// 				var name = propElement.getElementsByTagName('name')[0].childNodes[0].nodeValue;
	// 				var valueElement = propElement.getElementsByTagName('value')[0].childNodes[0];
	// 				var value = (valueElement) ? valueElement.nodeValue : '';
	// 				properties[name] = value;
	// 				propElement = propertyElements.iterateNext();
	// 			}
	// 			console.log(properties);
	// 			return properties;
	// 		};
	// 		function getText(xpath, doc) {
	// 			return doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE,null).iterateNext().childNodes[0].nodeValue;
	// 		};
	// 		var parser=new DOMParser();
	// 		var xmlDoc=parser.parseFromString(text,"text/xml");
	// 		var card = {};
	// 		card.url = 'thecardsurl';
	// 		card.number = getText('/card/number', xmlDoc);
	// 		card.name = getText('/card/name', xmlDoc);
	// 		card.type = getText('/card/card_type/name', xmlDoc);
	// 		card.properties = getProperties('card/properties/property', xmlDoc);
	// 		// card.status = properties['Status'];
	// 		// card.plannedFeature = '';
	// 		// card.lowEstimate = properties['Estimate'];
	// 		// card.highEstimate = properties['max estimate'];
	// 		// card.developer = properties['Developer'];
	// 		// card.release = properties['Release'];
	// 		// card.iteration = properties['Iteration'];
	// 		return card;
	// 	};

		// if (file.type.match(textType)) {
		// 	var reader = new FileReader();
		// 	reader.onload = function(e) {
		// 		$scope.$apply(function(){
		// 			$scope.cards[0] = parseFile(reader.result);
		// 		});
		// 	}
		// 	reader.readAsText(file);
		// }			
		// $scope.cards = _.map($scope.cardString.split(','), function(cardNumber) {
		// 	var reader = new FileReader();
		// 	reader.onload = function(e) {
		// 	  var text = reader.result;
		// 	};
		// 	reader.readAsText('examples/6.xml');

		// 	return Number(cardNumber);
		// });

