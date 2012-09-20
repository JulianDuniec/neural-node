var nn = require('../index');

exports.geneticAlgorithmTrainer = {
	testCreate : function(test) {
		var geneticAlgorithmTrainer = new nn.GeneticAlgorithmTrainer({
			populationSize : 10,
			neuralNetworkOptions : {
				numberOfInputs : 2,
				numberOfOutputs : 1,
				numberOfHiddenLayers : 1,
				numberOfNeuronsPerHiddenLayer : 1
			}
		});

		test.equal(10, geneticAlgorithmTrainer.networks.length);
		test.done();
	},

	testMutate : function(test) {
		var geneticAlgorithmTrainer = new nn.GeneticAlgorithmTrainer({
			mutationRate : 1 //Mutate ALL THE THINGS
		});
		var weights = [1,1,1,1,1,1,1];
		var mutatedWeights = geneticAlgorithmTrainer.mutate(weights);
		test.equal(mutatedWeights.length, weights.length);
		mutatedWeights.forEach(function(weight) {
			test.notEqual(1, weight);
		});
		test.done();
	},

	testMerge : function(test) {
		var geneticAlgorithmTrainer = new nn.GeneticAlgorithmTrainer({

		});
		var weightsA = [1,1,1,1];
		var weightsB = [2,2,2,2];
		var exectedResult = [1,1,2,2];

		var merged = geneticAlgorithmTrainer.merge(weightsA, weightsB);
		test.deepEqual(merged, exectedResult);
		test.done();
	},

	testErrorRate : function(test) {
		var geneticAlgorithmTrainer = new nn.GeneticAlgorithmTrainer({

		});
		var output = [1];
		var expected = [0];
		var expectedError = 1;
		var error = geneticAlgorithmTrainer.errorRate(output, expected);
		test.equal(expectedError, error);
		test.done();
	},

	testXOR : function(test){
		var geneticAlgorithm = new nn.GeneticAlgorithmTrainer({
			populationSize : 20,
			mutationRate : 0.3,
			maxPerbutation : 0.3,
			neuralNetworkOptions : {
				numberOfInputs : 2,
				numberOfOutputs : 1,
				numberOfHiddenLayers : 2,
				numberOfNeuronsPerHiddenLayer : 4
			}
		});

		geneticAlgorithm.train([
			{input : [1, 1], output : [0]},
			{input : [0, 1], output : [1]},
			{input : [1, 0], output : [1]},
			{input : [0, 0], output : [0]},
		], 3000);
		var res1 = geneticAlgorithm.networks[0].run([1, 1]);
		var res2 = geneticAlgorithm.networks[0].run([0, 1]);
		var res3 = geneticAlgorithm.networks[0].run([1, 0]);
		var res4 = geneticAlgorithm.networks[0].run([0, 0]);
		test.ok(res1[0]<0.5, "1:" + res1[0]);
		test.ok(res2[0]>0.5, "2:" + res2[0]);
		test.ok(res3[0]>0.5, "3:" + res3[0]);
		test.ok(res4[0]<0.5, "4:" + res4[0]);
		test.done();
	}
}
