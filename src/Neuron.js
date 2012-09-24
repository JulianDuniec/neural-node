
/*
	Class representing a single neuron.
	@param options.numberOfInputs The number of inputs that this neuron can handle.
	@param options.sigmoid A custom implementation of the activation-function.
*/
module.exports = function(options) {
	var me = {};

	me.weights = [];

	me.init = function() {
		for(var i = 0; i < options.numberOfInputs; i++) {
			me.weights.push(nn.MathHelpers.RandomClamped());
		}
		//Add the bias
		me.weights.push(nn.MathHelpers.RandomClamped());
	};

	me.run = function(input) {
		if(input.length != me.weights.length - 1) {
			throw "Invalid input length: " + input.length + ", expected: " + (me.weights.length - 1);
		}
		var activation = 0;
		var imax = input.length;
		for(var i = 0; i<imax; i++) {
			activation += input[i] * me.weights[i];
		}
		//Add the bias
		activation += me.weights[me.weights.length-1];
		return options.sigmoid ? options.sigmoid(activation) : me.sigmoid(activation);
	};

	me.sigmoid = function(input) {
		return 1/(1+Math.pow(Math.E, -input));
	};

	me.init();

	return me;
	
};