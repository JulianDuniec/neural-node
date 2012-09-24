/*
	A class representing a Neural Network.
	@param options.numberOfInputs The number of inputs in this neural network
	@param options.numberOfOutputs The number of outputs in this neural network
	@param options.numberOfHiddenLayers The number of hidden layers in this network
	@param options.numberOfNeuronsPerHiddenLayer The number of neurons per hidden layer
	@param options.weights Optional, the weights used in the initial state (otherwise random)
*/
module.exports = function(options) {
	
	var me = {};

	me.layers = [];

	me.init = function() {
		//Add input-layer
		me.layers.push(new nn.NeuronLayer({
			numberOfNeurons : options.numberOfInputs, 
			numberOfInputsPerNeuron : 1}));
		
		for(var i = 0; i < options.numberOfHiddenLayers; i++) {
			if(i === 0) {
				//First hidden layer should have as many inputs as the numberOfInputs
				me.layers.push(new nn.NeuronLayer({
					numberOfNeurons : options.numberOfNeuronsPerHiddenLayer,
					numberOfInputsPerNeuron : options.numberOfInputs
				}));
			}
			else {
				//The other hidden layers should have as many inputs as the number of
				//neurons on previous hidden layers.
				me.layers.push(new nn.NeuronLayer({
					numberOfNeurons : options.numberOfNeuronsPerHiddenLayer,
					numberOfInputsPerNeuron : options.numberOfNeuronsPerHiddenLayer
				}));
			}
		}

		//Add the output-layer
		me.layers.push(new nn.NeuronLayer({
			numberOfNeurons : options.numberOfOutputs, 
			numberOfInputsPerNeuron : options.numberOfNeuronsPerHiddenLayer}));
		

		//Import all the weights
		if(options.weights) {
			var counter = 0;
			for(var i = 0; i < me.layers.length; i++) {
				var layer = me.layers[i];
				for(var j = 0; j < layer.neurons.length; j++) {
					var neuron = layer.neurons[j];
					for(var k = 0; k < neuron.weights.length; k++) {
						neuron.weights[k] = options.weights[counter];
						counter++;
					}
				}
			}
		}
	};

	me.run = function(input) {
		var result = me.layers[0].runAsInputLayer(input);
		for (var i = 1; i < me.layers.length; i++) {
			result = me.layers[i].run(result);
		}
		return result;
	};

	me.export = function() {
		options.weights = me.getWeights();
		return options;
	};

	me.getWeights = function() {
		var res = [];
		me.layers.forEach(function(layer) {
			layer.neurons.forEach(function(neuron) {
				neuron.weights.forEach(function(weight) {
					res.push(weight);
				});
			});
		});
		return res;
	};

	me.init();

	return me;
};