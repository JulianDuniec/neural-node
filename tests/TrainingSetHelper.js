var nn = require('../index');

exports.TrainingSetHelper = {
	testFunctionApproximationSet : function(test) {
		var dataSet = [1,2,3,4,5,6,7,8];
		var numberOfInputs = 5;
		var numberOfOutputs = 2;
		var trainingSet = nn.TrainingSetHelper.generateTrainingSet(dataSet, numberOfInputs, numberOfOutputs);
		test.deepEqual(trainingSet[0].input, [1,2,3,4,5]);
		test.deepEqual(trainingSet[0].output, [6,7]);

		test.deepEqual(trainingSet[1].input, [2,3,4,5,6]);
		test.deepEqual(trainingSet[1].output, [7,8]);
		test.done();
	}
};