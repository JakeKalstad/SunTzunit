var Writer = (function () {
   var caseNum = 0;   

   var WriteToTest = function (message, result, desc) {
          $("<li id=" +caseNum +"></li>").appendTo("#cases");
          $("<img src=" + (result ?"../passBub.png":"../failBub.png") + ">" + message + "<br>" + desc +"</img>").appendTo("#"+caseNum);
          $("<li id=hover"+caseNum+" ><li/>").insertAfter("#"+caseNum);
          caseNum++;
    },
        
   HeadText = function(success, total) {
        var message = success + " of " + total + " Tests Passed";
        $("#resultText").html(message);
    },
    
   WriteDivs = function() {
            $('<section id="cases">').appendTo('#TestCase');
            $("</section>").appendTo('#TestCase');
   };
   
   return {
  	  Write : function (testCases) {
  	  	  WriteDivs(); 
	      var passedTests = testCases.PassedCases();
	      var failedTests = testCases.FailedCases();
	      for(var i=0; i < failedTests.length; i++) {
	          WriteToTest(failedTests[i].Name, false, failedTests[i].Description);
	      }
	      for(var i=0; i < passedTests.length; i++) { 
	      	  WriteToTest(passedTests[i].Name, true, passedTests[i].Description); 
	      }
	      
	      var totalCases = testCases.length();
	      var resultHeading = HeadText(passedTests.length, totalCases); 
  	  }
  };
})();