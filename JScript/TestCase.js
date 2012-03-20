 
function TestCase(name, message, evaluator) {
     this.Name = name;
     this.Description = message;
     this.Evaluation = evaluator;
}    

function TestCaseList() {
	this.testCases = []
	this.Add = function(name, desc, eval) {
		this.testCases.push(new TestCase(name, desc, eval))
	}
	
	this.Get = function (id) {
		return this.testCases[id]
	};
	
	this.FailedCases = function () {
		return this.testCases.filter(function(element){
			return !element.Evaluation();
		});
	};
	
	this.PassedCases = function () {
		return this.testCases.filter(function(element){
			return element.Evaluation();
		});
	};
	this.length = function() { return this.testCases.length; };
}
