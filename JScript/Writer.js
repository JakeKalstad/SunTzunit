var Writer = (function () {
   var caseNum = 0;   
return {
   WriteToTest : function (message, result) {
          $("<li id=" +caseNum +" class=testCase></li>").appendTo("#cases");
          $("<p class=message id=H"+caseNum+" href=#>" + message + "</p>").appendTo("#"+caseNum);
          $("<li id=hover"+caseNum+" ><li/>").insertAfter("#"+caseNum);
    },
        
   HeadText : function(success, total) {
        var message = success + " of " + total + " Tests Passed";
        $("#resultText").html(message);
    },
    
   WriteDivs : function() {
            $('<section id="cases">').appendTo('#TestCase');
            $("</section>").appendTo('#TestCase');
    },
        
   WriteSuccess : function(testCase) {
            this.WriteToTest(testCase.Name, true);
            $("#"+caseNum).css("background-color","green");
            $("#"+caseNum).css("background", "-moz-radial-gradient(center 45deg, circle closest-corner, green 0%,  #C0C0C0  100%)");
            $("#"+caseNum).css("background", "-webkit-gradient(radial, center center, 0, center center, 70, from(green), to(#C0C0C0 ))");
            $("#hover"+caseNum).css("background", "-moz-radial-gradient(center 45deg, circle closest-corner, #ffffff 0%, green 100%");
            $("#hover"+caseNum).css("background", "-webkit-gradient(radial, center center, 0, center center, 70, from(#ffffff), to(green)");
            caseNum++;
    },  
    
   WriteFail : function(testCase) {
            this.WriteToTest(testCase.Name, false);
            $("#"+caseNum).css("background-color", "red");
            $("#"+caseNum).css("background", "-moz-radial-gradient(center 45deg, circle closest-corner, red 0%,  #C0C0C0  100%)");
            $("#"+caseNum).css("background", "-webkit-gradient(radial, center center, 0, center center, 70, from(red), to(#C0C0C0 ))");
            $("#hover"+caseNum).css("background", "-moz-radial-gradient(center 45deg, circle closest-corner, #ffffff 0%, red 100%");
            $("#hover"+caseNum).css("background", "-webkit-gradient(radial, center center, 0, center center, 70, from(#ffffff), to(red)");
            caseNum++;
    }
  };
})();