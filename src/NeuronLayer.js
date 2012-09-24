/*
	Class representing a layer of neurons
	@param options.numberOfNeurons The amount of neurons in in the layer.
	@param optoins.numberOfInputsPerNeuron The amount of inputs that each of the neurons should contain.
*/
module.exports = function(options) {
	var me = {};

	me.neurons = [];
	
	me.init = function() {
		for(var i = 0; i < options.numberOfNeurons; i++) {
			me.neurons.push(new nn.Neuron({numberOfInputs: options.numberOfInputsPerNeuron}));
		}	
	};

	me.run = function(input) {
		var result = [];
			
		for(var i = 0; i < me.neurons.length; i++) {
			result.push(me.neurons[i].run(input));
		}
		return result;
	};

	me.runAsInputLayer = function(input) {
		var result = [];
		for(var i = 0; i < me.neurons.length; i++) {
			result.push(me.neurons[i].run([input[i]]));
		}
		return result;
	};

	me.init();

	return me;
};