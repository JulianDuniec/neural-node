/*
	Implementation of GeneticAlgorithm that determines fitness based on
	an error-rate. The sorting of the population is by fitness ascending.

	It also contains a training method that allows for training against a set for a given 
	amount of cycles.

	@param options.populationSize The number of networks.
	@param options.geneticAlgorithm See GeneticAlgorithm constructor
	@param options.neuralNetworkOptions See NeuralNetwork-constructor.
*/
module.exports = function(options) {
	
	var me = {};

	//Contains the entire population of networks.
	me.networks = [];

	if(!options.geneticAlgorithm)
		options.geneticAlgorithm = {};

	options.geneticAlgorithm.sort = function(a, b) {
			return (a.fitness - b.fitness);
	};

	me.geneticAlgorithm = new nn.GeneticAlgorithm(options.geneticAlgorithm);

	me.init = function() {
		//Initialize the population
		for(var i = 0; i < options.populationSize; i++) {
			me.networks.push(new nn.NeuralNetwork(options.neuralNetworkOptions));
		}
	};

	
	me.train = function(data, cycles, opts) {
		for(var i = 0; i < cycles; i++) {
			me.networks.forEach(function(network) {
				var error = 0;
				data.forEach(function(set) {
					var res = network.run(set.input);
					error += me.errorRate(res, set.output);
				});
				network.fitness = error;
			});
			me.networks = me.geneticAlgorithm.epoch(me.networks);
			if(opts && opts.epoch()) opts.epoch();
		}
	};

	/*	
		The error-rate-function.
		Sums the difference between two arrays into a scalar
	*/
	me.errorRate = function(a, b) {
		var sumError = 0;
		for (var i = a.length - 1; i >= 0; i--) {
			sumError += Math.abs(a[i] - b[i]);
		};
		return sumError;
	};


	me.init();

	return me;	
}