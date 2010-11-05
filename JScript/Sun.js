var Tzu = (function() {  
        var TestCases = [],
            UnidentifiedTestId = 1,   
            SuccessCount = 0,
            TestDescription = "",
            Write = Writer,
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
              
        var arraysMatch = function (act, exp) {
             if (act.length != exp.length) { return function () { return false; }; }
             else { return function () {
                for(var i=0;i<act.length;i++)
                { if(act[i] != exp[i]) { return false; } }
              };
       }
     }
        
  return {      
    Actual : function(act) { 
      ActualValue = act; 
      return this; 
    },
    
    Expected : function(exp) { 
      ExpectedValue = exp; 
      return this; 
    },
    
    IsNull : function(act) { 
      Evaluation = function() { return act === null || act === 'undefined'; };
      TestDescription = Evaluation() ? "Object Was Null" : "Object Was Not Null";
      return this; 
    },
    
     NotNull : function(act) { 
      Evaluation = function() { return act !== null && act !== 'undefined'; };
      TestDescription = Evaluation() ?  "Object Was Not Null" : "Object Was Null";
      return this; 
    },
    
    Assert : function(act, exp) { 
      if(act[0] == 'undefined' && typeof act.splice != 'undefined') {
         Evaluation = arraysMatch(act, exp);
         TestDescription = (Evaluation()) ? "Two Collections Match" : "Two Collections Do Not Match";
         return this;
      }
      Evaluation = function() { return act == exp; };
      TestDescription = (Evaluation()) ? "Objects are equal" : "Objects are not equal";
      return this; 
    },
    
    Contains : function(collection, item) {
        if(typeof collection == 'string') { Evaluation = function() { return containsSubstring(collection, item); }; }
        if(typeof collection.splice != 'undefined') { Evaluation = function() { return containsElement(collection, item); }; } 
        TestDescription = (Evaluation()) ? item + " was found" : item +" could not be found";
        return this;
    },
    
    NotEqual : function(act, expected) {
      Evaluation = function() { return act != expected; };
      TestDescription = (Evaluation()) ? "Objects are not equal" : "Objects are equal";
      return this;   
    },
    
    OfSameType : function(act, expected) {
      Evaluation = function() { return typeof act == typeof expected; };
      TestDescription = (Evaluation()) ? "Objects are of same type" : "Objects are not of same type";
      return this;   
    },  
    
    NotOfSameType : function(act, expected) {
      Evaluation = function() { return typeof act != typeof expected; };
      TestDescription = (Evaluation()) ? "Objects are not of same type" : "Objects are of same type" ;
      return this;   
    },
   
    WithoutException : function(func) {      
      Evaluation = function() { try { func(); } catch(er) { return false; } return true; };
      TestDescription = (Evaluation()) ? "Function Executed Without a Hitch" : "Function Threw up an exception" ;
      return this;   
    },
    
    /* Rendering / Handling */
    
    Test : function(name) {
      if(name == null || typeof name == 'undefined') { name = "Unidentified Test #" + UnidentifiedTestId++; }
      var desc = "";
      if(Evaluation == null || typeof Evaluation == 'undefined') {
        TestDescription = "Actual: "+ ActualValue + " <-> Expected: " + ExpectedValue;
        Evaluation = function () { return ActualValue == ExpectedValue; }; 
      }
      TestCases.push(new TestCase(name, TestDescription, Evaluation));
    },
    
    RenderTests : function() {      
      Write.WriteDivs();
        for(var i=0; i < TestCases.length; i++) {
           if(TestCases[i].Evaluation()) { this.HandleSuccess(i);} 
           else { this.HandleFail(i); }
         }      
       Effect.Apply(TestCases, TestCases.length - SuccessCount, Write.HeadText(SuccessCount, TestCases.length));
    },
   
   HandleSuccess : function(id) {
       SuccessCount++;
       Write.WriteSuccess(TestCases[id]);
   },
   
   HandleFail : function(id) {
      Write.WriteFail(TestCases[id]);
    }
  };
})();