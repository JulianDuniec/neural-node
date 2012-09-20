module.exports = function(options) {
	layers = [];
	
	//Add input-layer
	layers.push(new nn.NeuronLayer({
		numberOfNeurons : options.numberOfInputs, 
		numberOfInputsPerNeuron : 1}));
	
	for(var i = 0; i < options.numberOfHiddenLayers; i++) {
		if(i == 0) {
			//First hidden layer should have as many inputs as the numberOfInputs
			layers.push(new nn.NeuronLayer({
				numberOfNeurons : options.numberOfNeuronsPerHiddenLayer,
				numberOfInputsPerNeuron : options.numberOfInputs
			}));
		}
		else {
			//The other hidden layers should have as many inputs as the number of
			//neurons on previous hidden layers.
			layers.push(new nn.NeuronLayer({
				numberOfNeurons : options.numberOfNeuronsPerHiddenLayer,
				numberOfInputsPerNeuron : options.numberOfNeuronsPerHiddenLayer
			}));
		}
	}

	//Add the output-layer
	layers.push(new nn.NeuronLayer({
		numberOfNeurons : options.numberOfOutputs, 
		numberOfInputsPerNeuron : options.numberOfNeuronsPerHiddenLayer}));
	
	//Import all the weights
	if(options.weights) {
		var counter = 0;
		for(var i = 0; i < layers.length; i++) {
			var layer = layers[i];
			for(var j = 0; j < layer.neurons.length; j++) {
				var neuron = layer.neurons[j];
				for(var k = 0; k < neuron.weights.length; k++) {
					neuron.weights[k] = options.weights[counter++];
				}
			}
		}
	}

	return {

		layers : layers,

		options : options,

		run : function(input) {
			var result = input;
			for (var i = 0; i < this.layers.length; i++) {
				result = this.layers[i].run(result);
			};
			return result;
		},

		export : function() {
			this.options.weights = this.getWeights();
			return this.options;
		},

		getWeights : function() {
			var res = [];
			this.layers.forEach(function(layer) {
				layer.neurons.forEach(function(neuron) {
					neuron.weights.forEach(function(weight) {
						res.push(weight);
					});
				});
			});
			return res;
		}
	}
};