var nn = require('../index');

exports.neuralNetwork = {
	testCreate : function(test) {
		var neuralNetwork = new nn.NeuralNetwork({
			numberOfInputs : 5,
			numberOfOutputs : 5,
			numberOfHiddenLayers : 2,
			numberOfNeuronsPerHiddenLayer : 10
		});

		test.equal(4, neuralNetwork.layers.length);
		//Input-layer
		test.equal(5, 	neuralNetwork.layers[0].neurons.length);
		//Hidden layer 1
		test.equal(10, 	neuralNetwork.layers[1].neurons.length);
		//Hidden layer 2
		test.equal(10, 	neuralNetwork.layers[2].neurons.length);
		//Output layer
		test.equal(5, 	neuralNetwork.layers[3].neurons.length);

		test.done();
	},

	/*
		Asserts that when running the network, the 
		result length should equal the number of outputs
	*/
	testOutputLengthFromRun : function(test) {
		var neuralNetwork = new nn.NeuralNetwork({
			numberOfInputs : 2,
			numberOfOutputs : 1,
			numberOfHiddenLayers : 1,
			numberOfNeuronsPerHiddenLayer : 4
		});

		var data = [1,1];
		var result = neuralNetwork.run(data);

		test.equal(1, result.length);
		test.ok(result[0]>0, result[0].toString());
		test.ok(result[0]<1, result[0].toString());
		test.done();
	},

	testExportImport : function(test) {
		var neuralNetwork = new nn.NeuralNetwork({
			numberOfInputs : 2,
			numberOfOutputs : 1,
			numberOfHiddenLayers : 1,
			numberOfNeuronsPerHiddenLayer : 4
		});
		var input = [1,1];
		var firstResult = neuralNetwork.run(input);

		var data = neuralNetwork.export();
		test.equal(21, data.weights.length);
		
		var neuralNetwork2 = new nn.NeuralNetwork(data)

		var secondResult = neuralNetwork2.run(input);
		test.deepEqual(firstResult, secondResult);
		test.done();
	}
}
