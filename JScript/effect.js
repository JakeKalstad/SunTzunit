/*Filters*/
var Filter = (function() {
  return {
    Apply : function(name, array){
        return array.filter(function(element, index, array){
            return element.Name == name; 
        });
  }
 };  
})();

/*Effect*/
var Effect = (function() { 
    var Id = 0,
    TestCases = [],
    filtered = "";
   
        
    return {
      FindDescription : function(name) {
          return Filter.Apply(name, TestCases);
        },  
        
     ShowHoverTip : function (name) {  
          filtered = this.FindDescription(name);
          $("#hover"+Id).html(filtered[0].Description);
          $("#hover"+Id).addClass("hover");
          $("#hover"+Id).show();
        },
     icon : function (result) {
          var markUp = (result==0) ? '"../Pass.png"' : '"../Fail.png"';
          $("#icon").html('<img src=' + markUp + '/>');
        }, 
               
     HideHoverTip : function() {
          $("#hover"+Id).hide();
      },
        
     Apply : function(cases, result, message) {
      TestCases = cases;
      var ths = this;
      $(document).ready(function () {
        /* Hover Magic */
         $("#resultText").html(message);
         $("section").children().each(function() {
          var caseId =  $(this).attr('id')
           $(this).hover(function() { 
             Id = caseId;      
             ths.ShowHoverTip($(this).text());
            }, function () {
              ths.HideHoverTip(); 
           });
       });
        ths.icon(result);   
     });
    }
   }; 
  })();