var Tzu = (function() {  
        var TestCases = new TestCaseList(),
            UnidentifiedTestId = 1,    
            TestDescription = "",
            ExpectedValue = 0,
            ActualValue = 0,
            Evaluation = function(){};   
       
        var containsSubstring = function (col, item) {
              if(col.indexOf(item) == -1) { return false; }      
              return true;      
        };
                            
        var containsElement = function (col, item) {
            for(var i=0;i<col.length;i++)
             { if(col[i] == item) { return true; }  }
            return false;
        };
        
      	var Test = function(name) {
	      if(name == null || typeof name == 'undefined') { name = "Unidentified Test #" + UnidentifiedTestId++; }
	      var desc = "";
	      if(Evaluation == null || typeof Evaluation == 'undefined') {
	        TestDescription = "Actual: "+ ActualValue + " <-> Expected: " + ExpectedValue;
	        Evaluation = function () { return ActualValue == ExpectedValue; }; 
	      }
	      TestCases.Add(name, TestDescription, Evaluation);
	    };   
	    
        var arraysMatch = function (act, exp) {
             if (act.length != exp.length) { return function () { return false; }; }
             else { return function () {
                for(var i=0;i<act.length;i++)
                { if(act[i] != exp[i]) { return false; } }
              };
       }
     }
        
  return {       
    IsNull : function(act, name) { 
      Evaluation = function() { return act === null || act === 'undefined'; };
      TestDescription = Evaluation() ? "Object Was Null" : "Object Was Not Null";
      Test(name);
      return this; 
    },
    
     NotNull : function(act, name) { 
      Evaluation = function() { return act !== null && act !== 'undefined'; };
      TestDescription = Evaluation() ?  "Object Was Not Null" : "Object Was Null";
      Test(name);
      return this; 
    },
    
    Assert : function(act, exp, name) { 
      if(act[0] == 'undefined' && typeof act.splice != 'undefined') {
         Evaluation = arraysMatch(act, exp);
         TestDescription = (Evaluation()) ? "Two Collections Match" : "Two Collections Do Not Match";
         return this;
      }
      Evaluation = function() { return act == exp; };
      TestDescription = (Evaluation()) ? "Objects are equal" : "Objects are not equal";
      Test(name);
      return this; 
    },
    
    Contains : function(collection, item, name) {
        if(typeof collection == 'string') { Evaluation = function() { return containsSubstring(collection, item); }; }
        if(typeof collection.splice != 'undefined') { Evaluation = function() { return containsElement(collection, item); }; } 
        TestDescription = (Evaluation()) ? item + " was found" : item +" could not be found";
        Test(name);
        return this;
    },
    
    NotEqual : function(act, expected, name) {
      Evaluation = function() { return act != expected; };
      TestDescription = (Evaluation()) ? "Objects are not equal" : "Objects are equal";
      Test(name);
      return this;   
    },
    
    OfSameType : function(act, expected, name) {
      Evaluation = function() { return typeof act == typeof expected; };
      TestDescription = (Evaluation()) ? "Objects are of same type" : "Objects are not of same type";
      Test(name);
      return this;   
    },  
    
    NotOfSameType : function(act, expected, name) {
      Evaluation = function() { return typeof act != typeof expected; };
      TestDescription = (Evaluation()) ? "Objects are not of same type" : "Objects are of same type" ;
      Test(name);
      return this;   
    },
   
    WithoutException : function(func, name) {      
      Evaluation = function() { try { func(); } catch(er) { return false; } return true; };
      TestDescription = (Evaluation()) ? "Function Executed Without a Hitch" : "Function Threw up an exception" ;
      Test(name);
      return this;    
    },
    
    /* Rendering / Handling */  
    RenderTests : function() {    
     Writer.Write(TestCases);
    },
  };
})();