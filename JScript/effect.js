/*Filters*/
function Filter(){
    
}

Filter.prototype.Apply = function(name, array){
  return array.filter(function(element, index, array){
      return (element.Name == name);
  });
}

/* Icon Swap  */
function Icon(result) {
    var markUp = (result==0) ? '<img src="../Pass.png"/>' : '<img src="../Fail.png"/>';
    $("#icon").html(markUp);
};

/*Effect*/
function Effect(cases){
  this.TestCases = cases;
  this.Filter = new Filter();
}

Effect.prototype.Id = function(x){ 
  this.id = x;
}

Effect.prototype.GetId = function() {
  return this.id;
}

Effect.prototype.FindDescription = function(name) {
   return this.Filter.Apply(name, this.TestCases);
}

Effect.prototype.ShowHoverTip = function (name) {  
    var ths = this;
    filtered = ths.FindDescription(name);
    $("#hover"+ths.GetId()).html(filtered[0].Description);
    $("#hover"+ths.GetId()).addClass("hover");
    $("#hover"+ths.GetId()).show();
}

Effect.prototype.HideHoverTip = function() {
  $("#hover"+this.GetId()).hide();
}

Effect.prototype.Apply = function(result, message) {
  var ths = this;
  $(document).ready(function () {
    /* Hover Magic */
   $("#resultText").html(message);
   $("section").children().each(function() {
     var caseId = $(this).attr('id')
     $(this).hover(function() {  
        ths.Id(caseId);      
        ths.ShowHoverTip($(this).text());
      }, 
      function () {
        ths.HideHoverTip(); 
     });
   });
    Icon(result);   
 });
}
