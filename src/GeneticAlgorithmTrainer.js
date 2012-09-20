module.exports = function(options) {
	var networks = [];
	
	//Initialize the population
	for(var i = 0; i < options.populationSize; i++) {
		networks.push(new nn.NeuralNetwork(options.neuralNetworkOptions));
	}
	
	return {
		
		/* Contains entire population of networks */
		networks : networks,

		/* Contains the option-variables (passed in constructor) */
		options : options,

		/* Mutates the supplied weights */
		mutate : function(weights) {
			var mutated = [];
			var me = this;
			weights.forEach(function(weight) {
				if(Math.random() < me.options.mutationRate || 0.2) {
					mutated.push(weight + (nn.MathHelpers.RandomClamped() * me.options.maxPerbutation || 0.3) );
				} else {
					mutated.push(weight);
				}
			});
			return mutated;
		},

		/* Merges the weights from a and b */
		merge : function(a, b) {
			var result = [];
			var aLength = Math.ceil(a.length/2);
			var bLength = Math.floor(b.length/2);
			for(var i = 0; i < aLength; i++){
				result.push(a[i]);
			}
			for(var i = 0; i <bLength; i++) {
				result.push(b[aLength+i]);
			}
			return result;
		},

		/* Calculates the sum of errors between the two supplied arrays */
		errorRate : function(a, b) {
			var sumError = 0;
			for (var i = a.length - 1; i >= 0; i--) {
				sumError += Math.abs(a[i] - b[i]);
			};
			return sumError;
		}, 

		train : function(data, cycles, options) {
			var me = this;
			for(var i = 0; i < cycles; i++) {
				this.networks.forEach(function(network) {
					var error = 0;
					data.forEach(function(set) {
						var res = network.run(set.input);
						error += me.errorRate(res, set.output);
					});
					network.error = error;
				});
				this.epoch();
				if(options && options.epoch()) options.epoch();
			}
		},

		epoch : function() {
			//Sort according to error, least to first
			this.networks.sort(function(a, b) {
				return (a.error - b.error);
			});
			
			var len = this.networks.length;
			
			//Kill the low-performers
			this.networks.splice(2);

			
			//Add children based on the high-achievers
			for(var j = 0; j < len-2; j++) {
				var weightsA = this.networks[0].export().weights;
				var weightsB = this.networks[1].export().weights;
				var combined = this.merge(weightsA, weightsB);
				var mutated = this.mutate(combined);
				var opts = this.options.neuralNetworkOptions;
				opts.weights = mutated;
				this.networks.push( new nn.NeuralNetwork(opts));
			}
		}
	};
}