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
      var annotatedText = text;
      for (var i = xmlArr.length - 1; i > -1; i--) {

        //find category for class name
        var category = findCategory(xmlArr[i]);

        //find start, end counts to slice text
        var start = findCount(xmlArr[i], "START");
        var end = findCount(xmlArr[i], "END") + 1;

        //adds necessary formatting necessary to style and interact with text
        var insertText = "<span class='" + category.toLowerCase() + "'>" + annotatedText.slice(start, end) + "<div class='tooltip '>" + category + "<button id='i" + i + "'>Remove</button></div></span>"

        //adds formatting, updates string so it can be appended to DOM
        annotatedText = annotatedText.substring(0, start) + insertText + annotatedText.substring((start + (end - start)), annotatedText.length + end + insertText.length);
      }
      return annotatedText
    }

    //format text to retain line breaks, append to DOM
    var formatText = function(text) {
      text.replace(/\n/g, '<br>');
      $('.text').append(text);
    }

    var updateArr = function(index) {
      xmlArr.splice(index, 1);
      // removeText();
      // var replacementText = addAnnotations(xmlArr);
      // formatText(replacementText);
      //show updated XML
      //update counters
    };

    //*******HELPER FUNCTIONS Not to be Returned!!

    //get names of categories in xml
    function findCategory(ann) {
      return ann.getAttribute('category');
    }

    //finds start and end count for annotations
    function findCount(ann, str) {
      return parseInt(ann.lastElementChild.lastElementChild.getAttribute(str));
    }

    function removeText() {
      $('.text').empty();
      return;
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
      updateArr: updateArr,
      formatText: formatText
    }
  }

  //click handler to remove annotation
  //because buttons are added after inital page load, have to do this on .text
  $('.text').on('click', '.tooltip button', function() {
    var id = this.id.toString().slice(1, this.id.length);
    annotation.updateArr(parseInt(id));
  });

  //add function to keep track of how many annotations are in the text
  //save button refresh view and export xml -- push changes into an array?
//});
