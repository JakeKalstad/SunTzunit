
function Tzunit() {
    this.TestCases = [];
    this.UnidentifiedTestId = 1;   
    this.SuccessCount = 0; 
    this.writer = new Writer();
}
    
    Tzunit.prototype.Actual = function(act) { 
      this.ActualValue = act; 
      return this; 
    }
    
    Tzunit.prototype.Expected = function(exp) { 
      this.ExpectedValue = exp; 
      return this; 
    }
    
    Tzunit.prototype.IsNull = function(act) { 
      this.ActualValue = act;
      this.ExpectedValue = null; 
      return this; 
    }
    
    Tzunit.prototype.Assert = function(act, exp) { 
      this.ActualValue = act; 
      this.ExpectedValue = exp; 
      return this; 
    }
    
    Tzunit.prototype.Test = function(name) {
      if(name == null) name = "Unidentified Test #" + this.UnidentifiedTestId++;
      this.TestCases.push(new TestCase(this.ActualValue, this.ExpectedValue, name));  
    }
    
    Tzunit.prototype.RenderTests = function() {      
      this.writer.WriteDivs();
        for(var i=0; i < this.TestCases.length; i++) {
           if(this.TestCases[i].Evaluate()) this.HandleSuccess(i);
           else this.HandleFail(i);
         }
       new Effect(this.TestCases).Apply(this.SuccessCount == this.TestCases.length);
       
    } 
   
   Tzunit.prototype.HandleSuccess = function(id) {
       this.SuccessCount++;
       this.writer.WriteSuccess(this.TestCases[id]);
   }
   
   Tzunit.prototype.HandleFail = function(id) {
      this.writer.WriteFail(this.TestCases[id]);
   }