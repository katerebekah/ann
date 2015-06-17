$( document ).ready(function() {
  var text, xml;
  //retrieve text and XML with AJAX
  $.get('/sources/ch08.txt', function(d){
  	text = d;
  }).success(function(){
  	$.get('/sources/ch08.txt.xml', function(d){
  		xml = d;
  	}).fail(function(err){
  		//add error handling here
  		console.log(err);
  	});
  }).fail(function(err){
  	//add error handling here
  	console.log(err);
  });
  //format xml - link xml to text 
  //add annotations - keep link between xml and text - part of span's ID?
  //format text to retain line breaks - replace \n with <br>
  //add click handler to remove annotation -- remember the on function will be running after text is added dynamically!
  //save button refresh view and export xml --push changes into an array?
});