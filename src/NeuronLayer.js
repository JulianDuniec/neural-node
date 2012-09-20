/*
	Class representing a layer of neurons
*/
module.exports = function(options) {
	var neurons = [];
	for(var i = 0; i < options.numberOfNeurons; i++) {
		neurons.push(new nn.Neuron({numberOfInputs: options.numberOfInputsPerNeuron}));
	}

	return {
		neurons : neurons,
		run : function(input) {
			var result = [];
			for(var i = 0; i < this.neurons.length; i++) {
				result.push(this.neurons[i].run(input));
			}
			return result;
		}
	}
}