/*
	Class containing functions to create a new population of neural networks based 
	on the networks with highest fitness, given a population.

	The new networks will be a mutated and merged version of the highet performing networks.

	@param mutationRate Determines the chance of mutation
	@param sort Optional! Custom sorting-function (defaults to fitness descending)
	@param maxPerbutation Determines how big a mutation can be
*/
module.exports = function(options){
	var me = {};
	me.survivalRate = options.survivalRate || 0.2;
	if(!options.sort) {
		//Default sort-function, sort by fitness descending
		options.sort = function(a, b) {
			return (b.fitness - a.fitness);
		};
	}

	/*
		Mutates the supplied weights.
		The chance of mutation is determined by the mutationRate (defaults to 0.2).
		The weight will change to a random-value times the maxPerbutation
	*/
	me.mutate = function(weights) {
		var mutated = [];
		weights.forEach(function(weight) {
			if(Math.random() < options.mutationRate || 0.2) {
				mutated.push(weight + (nn.MathHelpers.RandomClamped() * options.maxPerbutation || 0.3) );
			} else {
				mutated.push(weight);
			}
		});
		return mutated;
	};

	/*
		Merges the supplied arrays by taking half A and half B
	*/
	me.merge = function(a, b) {
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
	};

	/*
		Kills all the low-performers (based on fitness) and produces a new array of
		networks with merged/mutated versions of the best berformers.
	*/
	me.epoch = function(networks) {
		networks.sort(options.sort);
		
		var len = networks.length;

		var killIndex = Math.floor(me.survivalRate * len);
		
		//Kill the low-performers
		networks.splice(killIndex);

		//get the parents (first and second )
		
		//Add children based on the high-achievers
		for(var i = 0; i < len-killIndex; i++) {
			var optionsA = networks[Math.floor(Math.random()*killIndex)].export();
			var optionsB = networks[Math.floor(Math.random()*killIndex)].export();
			var weightsA = optionsA.weights;
			var weightsB = optionsB.weights;
			var combined = me.merge(weightsA, weightsB);
			//the same base will be used for every new network, with a unique mutation
			var mutated = me.mutate(combined);
			var opts = optionsA;
			opts.weights = mutated;
			//Create a new network based on the same
			//options, but different weights
			networks.push( new nn.NeuralNetwork(opts));
		}
		return networks;
	};
	return me;
};