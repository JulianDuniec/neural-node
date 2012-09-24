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
			populationSize : 30,
			geneticAlgorithm : {
				mutationRate : 0.3,
				maxPerbutation : 0.3
			},
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
		], 3500);
		
		var res1 = geneticAlgorithm.networks[0].run([1, 1]);
		var res2 = geneticAlgorithm.networks[0].run([0, 1]);
		var res3 = geneticAlgorithm.networks[0].run([1, 0]);
		var res4 = geneticAlgorithm.networks[0].run([0, 0]);
		test.ok(res1[0]<0.5, "1:" + Math.round(res1[0]*1000) / 1000);
		test.ok(res2[0]>0.5, "2:" + Math.round(res2[0]*1000) / 1000);
		test.ok(res3[0]>0.5, "3:" + Math.round(res3[0]*1000) / 1000);
		test.ok(res4[0]<0.5, "4:" + Math.round(res4[0]*1000) / 1000);
		test.done();
	},

	testLinear : function(test) {
		var numberOfInputs = 2;
		var numberOfOutputs = 1;
		var geneticAlgorithm = new nn.GeneticAlgorithmTrainer({
			populationSize : 30,
			geneticAlgorithm : {
				mutationRate : 0.3,
				maxPerbutation : 0.3
			},
			neuralNetworkOptions : {
				numberOfInputs : 2,
				numberOfOutputs : 1,
				numberOfHiddenLayers : 2,
				numberOfNeuronsPerHiddenLayer : 4
			}
		});
		var dataSet = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7];
		var trainingSets = nn.TrainingSetHelper.generateTrainingSet(dataSet, numberOfInputs, numberOfOutputs);
		geneticAlgorithm.train(trainingSets, 3500);
		
		var res1 = geneticAlgorithm.networks[0].run([0.6, 0.7]);
		test.ok(res1[0] > 0.75 && res1[0] < 0.85, "1:" + res1[0]);
		test.done();
	}
}
