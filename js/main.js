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
        annotation();
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

    //add annotations - keep link between xml and text with an ID
    var addAnnotations = function(xmlArr) {
      //start loop at the end 
      //adds formatting text without messing up the start/end count of the rest of the annotations
      for (var i = xmlArr.length - 1; i > -1; i--) {

        //find category for class name
        var category = findCategory(xmlArr[i]);

        //find start, end counts to slice text
        var start = findCount(xmlArr[i], "START");
        var end = findCount(xmlArr[i], "END") + 1;

        //adds necessary formatting necessary to style and interact with text
        var insertText = "<span class='" + category.toLowerCase() + "'>" + text.slice(start, end) + "<div class='tooltip '>" + category + "<button id='i" + i + "'>Remove</button></div></span>"

        //adds formatting, updates string so it can be appended to DOM
        text = text.substring(0, start) + insertText + text.substring((start + (end - start)), text.length + end + insertText.length);
      }
      return text
    }

    //format text to retain line breaks, append to DOM
    var formatText = function(text) {
      text.replace(/\n/g, '<br>');
      $('.text').append(text);
    }

    //*******HELPER FUNCTIONS Not to be Returned!!

    //get names of categories in xml
    function findCategory(ann) {
      return ann.getAttribute('category');
    }

    //finds start and end count for annotations
    function findCount(ann, str) {
      return parseInt(ann.lastElementChild.lastElementChild.getAttribute(str));
    }

    //*******END of Helper Functions!!


    //does this when invoked
    var xmlArr = formatXMLArr(xml);
    var annotatedText = addAnnotations(xmlArr);
    formatText(annotatedText);

    //return functionalities
    return {
      formatXMLArr: formatXMLArr,
      addAnnotations: addAnnotations,
      formatText: formatText
    }
  }


  //add click handler to remove annotation -- remember the on function will be running after text is added dynamically!
  //save button refresh view and export xml -- push changes into an array?
});
