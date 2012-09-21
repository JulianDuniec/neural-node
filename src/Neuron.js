
/*
	Class representing a single neuron.
*/
module.exports = function(options) {
		var weights = [];
		for(var i = 0; i < options.numberOfInputs; i++) {
			weights.push(nn.MathHelpers.RandomClamped());
		}
		//Add the bias
		weights.push(nn.MathHelpers.RandomClamped());
		return {
			weights : weights,
			
			options : options,

			run : function(input) {
				
				if(input.length != this.weights.length - 1)
					throw "Invalid input length: " + input.length + ", expected: " + (this.weights.length - 1);
				var activation = 0;
				var imax = input.length;
				for(var i = 0; i<imax; i++) {
					activation += input[i] * this.weights[i];
				}
				//Add the bias
				activation += this.weights[this.weights.length-1];
				return options.sigmoid ? options.sigmoid(activation) : this.sigmoid(activation);
			},

			/*
				Default sigmoid-function
			*/
			sigmoid : function(input) {
				return 1/(1+Math.pow(Math.E, -input));
			}
		}
	
}