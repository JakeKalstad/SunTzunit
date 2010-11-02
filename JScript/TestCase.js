 
function TestCase(act, exp, name) {
     this.Actual = act;
     this.Expected = exp;
     this.Name = name;
     this.Description = "";
}    
   
    TestCase.prototype.Evaluate = function() {
      return this.Actual == this.Expected;
    }
