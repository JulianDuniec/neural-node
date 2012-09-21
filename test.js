var nn = require('./src/NeuralNetwork.js');

var geneticAlgorithm = new nn.GeneticAlgorithmTrainer({
		populationSize : 200,
		mutationRate : 0.3,
		maxPerbutation : 0.3,
		neuralNetworkOptions : {
			numberOfInputs : 4,
			numberOfOutputs : 1,
			numberOfHiddenLayers : 1,
			numberOfNeuronsPerHiddenLayer : 5
		}
	});


var expected = 0.1404118;

var trainingSets = [ 
	{ input: [ 0.1793975, 0.3202226, 0.4244039, 0.4937737 ],
		output: [ 0.5300726 ] },
	{ input: [ 0.3202226, 0.4244039, 0.4937737, 0.5300726 ],
		output: [ 0.5349539 ] },
	{ input: [ 0.4244039, 0.4937737, 0.5300726, 0.5349539 ],
		output: [ 0.5099887 ] },
	{ input: [ 0.4937737, 0.5300726, 0.5349539, 0.5099887 ],
		output: [ 0.4566693 ] },
	{ input: [ 0.5300726, 0.5349539, 0.5099887, 0.4566693 ],
		output: [ 0.3764133 ] },
	{ input: [ 0.5349539, 0.5099887, 0.4566693, 0.3764133 ],
		output: [ 0.2705677 ] } ];

var input = [ 0.5099887, 0.4566693, 0.3764133, 0.2705677 ];

console.log("Training network");

geneticAlgorithm.train(
	trainingSets, 
	3500, {
		epoch : function() {
			var result = geneticAlgorithm.networks[0].run(input)
			var estimateRounded = Math.round(result[0] * 100000)/100000;
			console.log("Approximated: " + estimateRounded + ", real: " + expected);
		}
}); 





