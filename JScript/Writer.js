function Writer() {
   this.caseNum = 1;
 };      

    Writer.prototype.WriteToTest = function (message, result) {
          $("<li id=" +this.caseNum +" class=testCase></li>").appendTo("#cases");
          $("<p class=message id=H"+this.caseNum+" href=#>" + message + "</p>").appendTo("#"+this.caseNum);
          $("<li id=hover"+this.caseNum+" ><li/>").insertAfter("#"+this.caseNum);
    };
        
    Writer.prototype.HeadText = function(success, total) {
        var message = success + " of " + total + " Tests Passed";
        $("#resultText").html(message);
    };
    
    Writer.prototype.WriteDivs = function() {
            $('<section id="cases">').appendTo('#TestCase');
            $("</section>").appendTo('#TestCase');
    };
        
    Writer.prototype.WriteSuccess = function(testCase) {
            this.WriteToTest(testCase.Name, true);
            $("#"+this.caseNum).css("background-color","green");
            $("#"+this.caseNum).css("background", "-moz-radial-gradient(center 45deg, circle closest-corner, green 0%,  #C0C0C0  100%)");
            $("#"+this.caseNum).css("background", "-webkit-gradient(radial, center center, 0, center center, 70, from(green), to(#C0C0C0 ))");
            $("#hover"+this.caseNum).css("background", "-moz-radial-gradient(center 45deg, circle closest-corner, #ffffff 0%, green 100%");
            $("#hover"+this.caseNum).css("background", "-webkit-gradient(radial, center center, 0, center center, 70, from(#ffffff), to(green)");
            this.caseNum++;
    };   
    
    Writer.prototype.WriteFail = function(testCase) {
            this.WriteToTest(testCase.Name, false);
            $("#"+this.caseNum).css("background-color", "red");
            $("#"+this.caseNum).css("background", "-moz-radial-gradient(center 45deg, circle closest-corner, red 0%,  #C0C0C0  100%)");
            $("#"+this.caseNum).css("background", "-webkit-gradient(radial, center center, 0, center center, 70, from(red), to(#C0C0C0 ))");
            $("#hover"+this.caseNum).css("background", "-moz-radial-gradient(center 45deg, circle closest-corner, #ffffff 0%, red 100%");
            $("#hover"+this.caseNum).css("background", "-webkit-gradient(radial, center center, 0, center center, 70, from(#ffffff), to(red)");
            this.caseNum++;
    };