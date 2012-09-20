var nn = require('../index');

exports.neuronLayer = {
	testCreate : function(test) {
		var neuronLayer = new nn.NeuronLayer({numberOfNeurons : 5, numberOfInputsPerNeuron: 10});
		test.equal(5, neuronLayer.neurons.length);
		neuronLayer.neurons.forEach(function(neuron) {
			test.equal(11, neuron.weights.length);
		});
		test.done();
	},

	testRun : function(test) {
		var neuronlayer = new nn.NeuronLayer({numberOfNeurons : 5, numberOfInputsPerNeuron: 2});
		var result = neuronlayer.run([1,1]);
		test.equal(5, result.length);
		for(var i = 0; i< result.length; i++) {
			//Assert that default sigmoid-function runs
			test.ok(result[i]>0, result[i].toString());
			test.ok(result[i]<1, result[i].toString());
		}
		test.done();
	}
};
