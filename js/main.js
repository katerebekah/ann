'use strict';

$(document).ready(function() {
  var text, xml;
  //retrieve text and XML with AJAX
  $.get('/sources/ch08.txt')
    .success(function(d) {
      text = d;
      getXML()
    })
    .fail(function(err) {
      console.log(err);
    });

  function getXML() {
    $.get('/sources/ch08.txt.xml', 'xml')
      .success(function(d) {
        xml = d;
        //call annotate
        annotate(xml, text);
      }).fail(function(err) {
        console.log(err);
      });
  }

  function annotate(xml, text) {
    var xmlDoc = new XmlDocument(xml);

    //format xml into an array for ease of use
    var xmlArr = xmlDoc.getXMLNodeArr();


    //Add Elements to DOM

    //empty div & append new annotated text
    $('.text').empty().append(addAnnotationsToString(xmlArr, xmlDoc));

    //add category count to html
    var categories = xmlDoc.getCategories();
    for (var i = 0; i < categories.length; i++) {
      var count = xmlDoc.getCategoryCount(categories[i]);
      $('#' + categories[i]).html(categories[i] + ": " + count);
    }


    //CLICK HANDLERS

    //remove button
    $('.text').on('click', '.removeButton', function(e) {
      
      //prevents multiple firings on click
      $('.text').unbind();

      var id = $(this).parent().attr('id').toString().slice(1, $(this).parent().attr('id').length);
      xml = xmlDoc.removeNode(parseInt(id));
      annotate(xml, text);
    });

    //edit an annotation
    $('.text').on('change', '.edit', function(e) {
      $('.text').unbind();
      var newCat = e.target.selectedOptions[0].value;
      var id = $(this).parent().attr('id').toString().slice(1, $(this).parent().attr('id').length);
      xml = xmlDoc.editNode(parseInt(id), newCat);
      annotate(xml, text);
    });

    //Handles Tooltips
    $('span').mouseover(function(e) {
      $(this).children()[0].style.display = "block";
    });

    $('span').mouseleave(function(e) {
      $(this).children()[0].style.display = "none";
    });

  };


  //need to pass in xmlDoc with dependency injection
  function addAnnotationsToString(xmlArr, xmlDoc) {
    var annotatedText = text;

    //start loop at the end 
    //adds formatting text without messing up the start/end count of the rest of the annotations
    for (var i = xmlArr.length - 1; i > -1; i--) {

      //find category for class name
      var category = xmlDoc.getNodeCategory(i);

      //find start, end counts to slice text
      var start = xmlDoc.getNodeCharPosition(i, 'START');
      var end = xmlDoc.getNodeCharPosition(i, 'END') + 1;

      var editButton = "<br><label>Edit Category:</label><select class='edit'><option>Select An Option</option><option value='PERSON'>PERSON</option><option value='LOCATION'>LOCATION</option><option value='ORGANIZATION'>ORGANIZATION</option></select>";
      var deleteButton = "<button class='removeButton'>Remove</button>";
      var insertText = "<span class='" + category.toLowerCase() + "'>" + annotatedText.slice(start, end) + "<div class='tooltip' id='i" + i + "'><h4>Category: " + category + "</h4>" + editButton + deleteButton + "</div></span>";

      //adds formatting, updates string so it can be appended to DOM
      annotatedText = annotatedText.substring(0, start) + insertText + annotatedText.substring((start + (end - start)), annotatedText.length + end + insertText.length);
    }
    //replaces carriage returns with br tags
    return annotatedText.replace(/\n/g, '<br>');
  }

});
