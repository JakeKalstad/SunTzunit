function Writer() {
   this.caseNum = 1;
 }      

    Writer.prototype.WriteToTest = function (message, result) {
          var image = (result) ? "../pass.png" : "../failzor.png";
          $("<li id=" +this.caseNum +" class=testCase></li>").appendTo("#cases");
          $('<img src='+ image + '>').appendTo("#"+this.caseNum);
          $("<a id=H"+this.caseNum+" href=#>" + message + "</a>").appendTo("#"+this.caseNum);
          $("<li id=hover"+this.caseNum+" ><li/>").insertAfter("#"+this.caseNum);
    }
        
    Writer.prototype.Description = function(testCase) {
           return "Actual: "+ testCase.Actual + " <-> Expected: " + testCase.Expected;
    }   
    
    Writer.prototype.WriteDivs = function() {
            $('<section id="cases">').appendTo('#TestCase');
            $("</section>").appendTo('#TestCase');
    }
        
    Writer.prototype.WriteSuccess = function(testCase) {
            testCase.Description = this.Description(testCase);
            this.WriteToTest(testCase.Name, true);
            $("#"+this.caseNum).css("background-color","green");
            $("#"+this.caseNum).css("background", "-moz-radial-gradient(center 45deg, circle closest-corner, green 0%,  #C0C0C0  100%)");
            $("#"+this.caseNum).css("background", "-webkit-gradient(radial, center center, 0, center center, 70, from(green), to(#C0C0C0 ))");
            this.caseNum++;
    }   
    
    Writer.prototype.WriteFail = function(testCase) {
            testCase.Description = this.Description(testCase);
            this.WriteToTest(testCase.Name, false);
            $("#"+this.caseNum).css("background-color", "red");
            $("#"+this.caseNum).css("background", "-moz-radial-gradient(center 45deg, circle closest-corner, red 0%,  #C0C0C0  100%)");
            $("#"+this.caseNum).css("background", "-webkit-gradient(radial, center center, 0, center center, 70, from(red), to(#C0C0C0 ))");
            this.caseNum++;
    }