'use strict';

$(document).ready(function() {
  var text, xml;
  //retrieve text and XML with AJAX
  $.get('/sources/ch08.txt', function(d) {
    text = d;
  }).success(function() {
    $.get('/sources/ch08.txt.xml', function(d) {
      xml = d;
    }).success(function() {
      //call annotate
      annotate(xml, text);
    }).fail(function(err) {
      //add error handling here
      console.log(err);
    });
  }).fail(function(err) {
    //add error handling here
    console.log(err);
  });

  function annotate(xml, text) {
    //use xmlHandler library to make new instance of xmlDocument
    var xmlDoc = new XmlDocument(xml);
    //format xml into an array for ease of use
    var xmlArr = xmlDoc.getXMLNodeArr();
    //prepare div for appending annotated text
    $('.text').empty();
    //annotate text and append it to DOM
    $('.text').append(addAnnotationsToString(xmlArr, xmlDoc));

    //add category count to html
    var categories = xmlDoc.getCategories(xmlArr);
    for (var i = 0; i < categories.length; i++) {
      var count = xmlDoc.getCategoryCount(xmlArr, categories[i]);
      $('#' + categories[i]).html(count);
    }
    //add xml to html 
    
    //because buttons are added after inital page load, have to do this on .text
    $('.text').on('click', '.removeButton', function(e) {
      //prevents multiple firings on click
      $('.text').unbind();
      var id = $(this).parent().attr('id').toString().slice(1, $(this).parent().attr('id').length);
      xml = xmlDoc.removeNode(parseInt(id));
      annotate(xml, text);
    });

    //click handler to edit annotation
    $('.text').on('change', '.edit', function(e) {
      var newCat = e.target.selectedOptions[0].value;
      $('.text').unbind();
      //prevents multiple firings on click
      var id = $(this).parent().attr('id').toString().slice(1, $(this).parent().attr('id').length);
      xml = xmlDoc.editNode(parseInt(id), newCat);
      annotate(xml, text);
    });
  };

  function addAnnotationsToString(xmlArr, xmlDoc) {
    var annotatedText = text;
    //start loop at the end 
    //adds formatting text without messing up the start/end count of the rest of the annotations
    for (var i = xmlArr.length - 1; i > -1; i--) {
      //find category for class name
      var category = xmlDoc.getNodeCategory(xmlArr[i]);
      //find start, end counts to slice text
      var start = xmlDoc.getNodeCharPosition(xmlArr[i], 'START');
      var end = xmlDoc.getNodeCharPosition(xmlArr[i], 'END') + 1;
      var editButton = "<label>Edit Category:</label><select class='edit'><option>Select An Option</option><option value='PERSON'>PERSON</option><option value='LOCATION'>LOCATION</option><option value='ORGANIZATION'>ORGANIZATION</option></select>";
      var deleteButton = "<button class='removeButton'>Remove</button>";
      //adds necessary formatting necessary to style and interact with text
      var insertText = "<span class='" + category.toLowerCase() + "'>" + annotatedText.slice(start, end) + "<div class='tooltip' id='i" + i + "'>" + category + deleteButton + editButton + "</div></span>";
      //adds formatting, updates string so it can be appended to DOM
      annotatedText = annotatedText.substring(0, start) + insertText + annotatedText.substring((start + (end - start)), annotatedText.length + end + insertText.length);
    }
    //replaces carriage returns with br tags
    return annotatedText.replace(/\n/g, '<br>');
  }
});
