var nn = require('../index');

exports.GeneticAlgorithm = {
	
	testMutate : function(test) {
		var geneticAlgorithm = new nn.GeneticAlgorithm({
			mutationRate : 1 //Mutate ALL THE THINGS
		});
		var weights = [1,1,1,1,1,1,1];
		var mutatedWeights = geneticAlgorithm.mutate(weights);
		test.equal(mutatedWeights.length, weights.length);
		mutatedWeights.forEach(function(weight) {
			test.notEqual(1, weight);
		});
		test.done();
	},

	testMerge : function(test) {
		var geneticAlgorithm = new nn.GeneticAlgorithm({

		});
		var weightsA = [1,1,1,1];
		var weightsB = [2,2,2,2];
		var exectedResult = [1,1,2,2];

		var merged = geneticAlgorithm.merge(weightsA, weightsB);
		test.deepEqual(merged, exectedResult);
		test.done();
	},

	testEpoch : function(test) {
		var networks = [];
		var populationSize = 10;
		var neuralNetworkOptions =  {
				numberOfInputs : 2,
				numberOfOutputs : 1,
				numberOfHiddenLayers : 1,
				numberOfNeuronsPerHiddenLayer : 1
			};
		//Initialize the population
		for(var i = 0; i < populationSize; i++) {
			var network = new nn.NeuralNetwork(neuralNetworkOptions);
			network.fitness = i;
			networks.push(network);
		}

		var geneticAlgorithm = new nn.GeneticAlgorithm({

		});

		networks = geneticAlgorithm.epoch(networks);

		test.equal(networks.length, populationSize);
		test.ok(networks[0].fitness == 9 );
		test.ok(networks[1].fitness == 8);
		for(var i = 2; i < networks.length; i++) {
			test.ok(networks[i].fitness == null );
		}

		test.done();
	},

	testEpochCustomSort : function(test) {
		var networks = [];
		var populationSize = 10;
		var neuralNetworkOptions =  {
				numberOfInputs : 2,
				numberOfOutputs : 1,
				numberOfHiddenLayers : 1,
				numberOfNeuronsPerHiddenLayer : 1
			};
		//Initialize the population
		for(var i = 0; i < populationSize; i++) {
			var network = new nn.NeuralNetwork(neuralNetworkOptions);
			network.fitness = i;
			networks.push(network);
		}

		var geneticAlgorithm = new nn.GeneticAlgorithm({
			//Sort ascending
			sort : function(a,b) {
				return (a.fitness-b.fitness);
			}
		});

		networks = geneticAlgorithm.epoch(networks);

		test.equal(networks.length, populationSize);
		test.ok(networks[0].fitness == 0 );
		test.ok(networks[1].fitness == 1);
		for(var i = 2; i < networks.length; i++) {
			test.ok(networks[i].fitness == null );
		}

		test.done();
	}
};