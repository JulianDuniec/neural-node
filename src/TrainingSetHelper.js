/*
	Helper class for generating training sets from a given data-set
*/
module.exports = {
	/*
		Produces a training-set from a given data-set, numberOfInputs and numberOfOutputs
		example:
			dataSet : [1,2,3,4,5,6]
			numberOfInputs : 3,
			numberOfOutputs : 2,
			result : [
				{input : [1,2,3], output : [4,5]},
				{input : [2,3,4], output : [5,6]},
			]
	*/
	generateTrainingSet : function(dataSet, numberOfInputs, numberOfOutputs) {
		var windowSize = numberOfInputs+numberOfOutputs;
		var len = dataSet.length;
		var i = 0, j=0;
		var trainingSets = [];
		for(i=0; i<=len-windowSize; i++) {
			var set = {};
			set.input = [];
			set.output = [];
			for(j = 0; j < numberOfInputs; j++) {
				set.input.push(dataSet[i+j]);
			}
			for(j = 0; j < numberOfOutputs; j++) {
				set.output.push(dataSet[i+numberOfInputs+j]);
			}
			trainingSets.push(set);
		}
		return trainingSets;
	}
}