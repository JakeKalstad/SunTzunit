  function ContainsSubstring(col, item) {
      if(col.indexOf(item) == -1) { return false; }      
      return true;      
  }
  
  function ContainsElement(col, item) {
      for(var i=0;i<col.length;i++){
        if(col[i] == item) { return true; }
      }
      return false;
  }
    
  function ArraysMatch(act, exp) {
      if (act.length != exp.length) return function () { return false; };
      else return function () {
        for(var i=0;i<act.length;i++){
          if(act[i] != exp[i]) { return false; } 
        }
        return true;
      }
  };
  
  function Tzunit() {
      this.TestCases = [];
      this.UnidentifiedTestId = 1;   
      this.SuccessCount = 0; 
      this.TestDescription = "";
      this.writer = new Writer();
  };
    
    Tzunit.prototype.Actual = function(act) { 
      this.ActualValue = act; 
      return this; 
    };
    
    Tzunit.prototype.Expected = function(exp) { 
      this.ExpectedValue = exp; 
      return this; 
    };
    
    Tzunit.prototype.IsNull = function(act) { 
      this.Evaluation = function() { return act == null || act === 'undefined'; }
      this.TestDescription = this.Evaluation() ? "Object Was Null" : "Object Was Not Null";
      return this; 
    };
    
    Tzunit.prototype.NotNull = function(act) { 
      this.Evaluation = function() { return act != null && act !== 'undefined'; }
      this.TestDescription = this.Evaluation() ?  "Object Was Not Null" : "Object Was Null";
      return this; 
    };
    
    Tzunit.prototype.Assert = function(act, exp) { 
      if(typeof act.splice != 'undefined'){
         this.Evaluation = ArraysMatch(act, exp);
         this.TestDescription = (this.Evaluation()) ? "Two Collections Match" : "Two Collections Do Not Match";
         return this;
      }
      this.Evaluation = function() { return act == exp; }
      this.TestDescription = (this.Evaluation()) ? "Objects are equal" : "Objects are not equal";
      return this; 
    };
    
    Tzunit.prototype.Contains = function(collection, item) {
        if(typeof collection == 'string') this.Evaluation = function() { return ContainsSubstring(collection, item); }
        if(typeof collection.splice != 'undefined') this.Evaluation = function() { return ContainsElement(collection, item); }    
        this.TestDescription = (this.Evaluation()) ? item + " was found" : item +" could not be found";
        return this;
    };
    
    Tzunit.prototype.NotEqual = function(act, expected) {
      this.Evaluation = function() { return act != expected; }
      this.TestDescription = (this.Evaluation()) ? "Objects are not equal" : "Objects are equal";
      return this;   
    };
    
    Tzunit.prototype.OfSameType = function(act, expected) {
      this.Evaluation = function() { return typeof act == typeof expected; }
      this.TestDescription = (this.Evaluation()) ? "Objects are of same type" : "Objects are not of same type";
      return this;   
    };    
    
    Tzunit.prototype.NotOfSameType = function(act, expected) {
      this.Evaluation = function() { return typeof act != typeof expected; }
      this.TestDescription = (this.Evaluation()) ? "Objects are not of same type" : "Objects are of same type" ;
      return this;   
    };
    
    Tzunit.prototype.WithoutException = function(func) {
      
      this.Evaluation = function() { try { func() } catch(er) { return false; } return true; }
      this.TestDescription = (this.Evaluation()) ? "Function Executed Without a Hitch" : "Function Threw up an exception" ;
      return this;   
    };
    
    /* Rendering / Handling */
    
    Tzunit.prototype.Test = function(name) {
      if(name == null) name = "Unidentified Test #" + this.UnidentifiedTestId++;
      var desc = "";
      if(this.Evaluation == null || typeof this.Evaluation == 'undefined') {
        this.TestDescription = "Actual: "+ this.ActualValue + " <-> Expected: " + this.ExpectedValue;
        this.Evaluation = function () { return this.ActualValue == this.ExpectedValue; } 
      }
      this.TestCases.push(new TestCase(name, this.TestDescription, this.Evaluation));
    };
    
    Tzunit.prototype.RenderTests = function() {      
      this.writer.WriteDivs();
        for(var i=0; i < this.TestCases.length; i++) {
           if(this.TestCases[i].Evaluation()) this.HandleSuccess(i);
           else this.HandleFail(i);
         }       
       new Effect(this.TestCases).Apply(this.TestCases.length -this.SuccessCount, this.writer.HeadText(this.SuccessCount, this.TestCases.length));
    };
   
   Tzunit.prototype.HandleSuccess = function(id) {
       this.SuccessCount++;
       this.writer.WriteSuccess(this.TestCases[id]);
   };
   
   Tzunit.prototype.HandleFail = function(id) {
      this.writer.WriteFail(this.TestCases[id]);
   };