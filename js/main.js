$(document).ready(function() {
  var text, xml;
  //retrieve text and XML with AJAX
  $.get('/sources/ch08.txt', function(d) {
    text = d;
  }).success(function() {
    
    $.get('/sources/ch08.txt.xml', function(d) {
      xml = d;
    }).success(function() {
      //invoke annotation function
    })
    .fail(function(err) {
      //add error handling here
      console.log(err);
    });

  }).fail(function(err) {
    //add error handling here
    console.log(err);
  });

  //parent function to handle processing raw materials and adding annotations
  var annotation = function() {
    //format xml into an array for ease of use
    var formatXMLArr = function(xml) {
      return $('span', xml);
    }

    //format text to retain line breaks, append to DOM
    var formatText = function(text) {
      console.log(text);
      text.replace(/\n/g, '<br>');
      $('.text').append(text);
    }

    //*******HELPER FUNCTIONS Not to be Returned!!

    //get names of categories in xml
    function findCategory(ann) {
      return ann.getAttribute('category');
    }

    //finds start and end count for annotations
    function findCount(ann, str){
      return parseInt(ann.lastElementChild.lastElementChild.getAttribute(str));
    }

    //*******END of Helper Functions!!

    //return functionalities
    return {
      formatXMLArr: formatXMLArr,
      formatText: formatText
    }
  }


  //add click handler to remove annotation -- remember the on function will be running after text is added dynamically!
  //save button refresh view and export xml --push changes into an array?
});
