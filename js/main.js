$(document).ready(function() {
  var text, xml;
  //retrieve text and XML with AJAX
  $.get('/sources/ch08.txt', function(d) {
    text = d;
  }).success(function() {
    $.get('/sources/ch08.txt.xml', function(d) {
      xml = d;
    }).fail(function(err) {
      //add error handling here
      console.log(err);
    });
  }).fail(function(err) {
    //add error handling here
    console.log(err);
  });
  var annotation = (function(text, xml) {
    //format xml into an array for ease of use
    var formatXMLArr = function(xml) {
      return $('span', xml);
    }

    //format text to retain line breaks
    var formatText = function(txt) {
      return text.replace(/\n/g, '<br>');
    }
    //return functionalities
    return {
      formatXMLArr: formatXMLArr,
      formatText: formatText,
    }
  })();

  //add annotations - keep link between xml and text - part of span's ID?
  //add click handler to remove annotation -- remember the on function will be running after text is added dynamically!
  //save button refresh view and export xml --push changes into an array?
});
