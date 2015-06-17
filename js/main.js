//$(document).ready(function() {
  var text, xml;
  //retrieve text and XML with AJAX
  $.get('/sources/ch08.txt', function(d) {
    text = d;
  }).success(function() {

    $.get('/sources/ch08.txt.xml', function(d) {
        xml = d;
      }).success(function() {
        //invoke annotation function
        annotation(xml, text);
      })
      .fail(function(err) {
        //add error handling here
        console.log(err);
      });

  }).fail(function(err) {
    //add error handling here
    console.log(err);
  });


  var annotation = function(xml, text) {
    //use xmlHandler library to make new instance of xmlDocument
    var xmlDoc = new xmlDocument(xml);
    //format xml into an array for ease of use
    var xmlArr = xmlDoc.getXMLNodeArr();
    //add annotations - keep link between xml and text with an ID

    formatText(addAnnotations(xmlArr));

    function addAnnotations(xmlArr) {
    var annotatedText = text;
      //start loop at the end 
      //adds formatting text without messing up the start/end count of the rest of the annotations
      for (var i = xmlArr.length - 1; i > -1; i--) {

        //find category for class name
        var category = xmlDoc.getNodeCategory(xmlArr[i]);

        //find start, end counts to slice text
        var start = xmlDoc.getNodeCharPosition(xmlArr[i], "START");
        var end = xmlDoc.getNodeCharPosition(xmlArr[i], "END") + 1;

        //adds necessary formatting necessary to style and interact with text
        var insertText = "<span class='" + category.toLowerCase() + "'>" + annotatedText.slice(start, end) + "<div class='tooltip '>" + category + "<button id='i" + i + "'>Remove</button></div></span>"

        //adds formatting, updates string so it can be appended to DOM
        annotatedText = annotatedText.substring(0, start) + insertText + annotatedText.substring((start + (end - start)), annotatedText.length + end + insertText.length);
      }
      return annotatedText
    }

    function formatText(text) {
      text.replace(/\n/g, '<br>');
      $('.text').append(text);
    }

    function removeText() {
      $('.text').empty();
      return;
    }


  //click handler to remove annotation
  //because buttons are added after inital page load, have to do this on .text
  $('.text').on('click', '.tooltip button', function() {
    var id = this.id.toString().slice(1, this.id.length);
    xmlDoc = new xmlDocument(xmlDoc.removeNode(parseInt(id)));
    xmlArr = xmlDoc.getXMLNodeArr()
    removeText();
    formatText(addAnnotations(xmlArr));
  });

  }
  //add function to keep track of how many annotations are in the text
  //save button refresh view and export xml -- push changes into an array?
//});
