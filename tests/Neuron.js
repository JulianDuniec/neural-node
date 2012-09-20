var nn = require('../index');

exports.neuron = {
	testCreate : function(test) {
		var neuron = new nn.Neuron({numberOfInputs : 10});
		//10 inputs + 1 bias == 11
		test.equal(11, neuron.weights.length);
		var prev = null;
		neuron.weights.forEach(function(weight) {
			test.ok(weight>-1);
			test.ok(weight<1);
			if(prev != null)
				test.ok(weight != prev);
			prev = weight;
		});
		test.done();
	},

	testRun : function(test) {
		var neuron = new nn.Neuron({numberOfInputs : 2});
		var result = neuron.run([1,1]);
		test.ok(result>0, result.toString());
		test.ok(result<1, result.toString());
		test.done();
	},

	testRunCustomSigmoid : function(test) {
		var neuron = new nn.Neuron({numberOfInputs : 2, sigmoid : function(input) {
			return 200;
		}});
		var result = neuron.run([1,1]);
		test.equal(result, 200);
		test.done();
	}
};
