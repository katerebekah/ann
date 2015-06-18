'use strict';

function XmlDocument(xml) {
  this.xml = xml;
  
  this.parsedXML = this.xml.getElementsByTagName('document')[0];
  
  this.getXMLNodeArr = function() {
    return $('span', xml);
  };
  
  this.getNodeCategory = function(index) {
  	console.log(typeof(index), index)
  	if (typeof(index) !== 'number') throw new Error('Must be a number');
  	var node = this.parsedXML.getElementsByTagName('span')[index];
  	if (node === null) throw new Error('Node Not Found')
    return node.getAttribute('category');
  };
  
  this.getNodeCharPosition = function(index, str) {
  	if (typeof(index) !== 'number') throw new Error('Must be a number');
  	var node = this.parsedXML.getElementsByTagName('span')[index];
  	if (node === null) throw new Error('Node Not Found')
  	return parseInt(node.lastElementChild.lastElementChild.getAttribute(str));
  };
  
  this.removeNode = function(index) {
  	if (typeof(index) !== 'number') throw new Error('Must be a number');
  	var node = this.parsedXML.getElementsByTagName('span')[index];
  	if (node === null) throw new Error('Node Not Found')
		node.remove();
    return this.xml;
  };
  
  this.editNode = function(index, newCat) {
  	if (typeof(index) !== 'number') throw new Error('Must be a number');
  	if (typeof(newCat) !== 'string') throw new Error('Attribute names must be a string')
  	var node = this.parsedXML.getElementsByTagName('span')[index];
  	if (node === null) throw new Error('Node Not Found')
    node.setAttribute('category', newCat);
    return this.xml;
  };
  
  this.getCategories = function(){
  	var categories = [];
  	var nodeArr = this.getXMLNodeArr();
  	for (var i = 0; i < nodeArr.length; i++){
  		if (categories.indexOf(this.getNodeCategory(i)) === -1) {
  			categories.push(this.getNodeCategory(i));
  		}
  	}
  	return categories;
  }
  
  this.getCategoryCount = function(category){
  	var counter = 0
  	var nodeArr = this.getXMLNodeArr();
  	for (var i = 0; i < nodeArr.length; i++) {
  		if (this.getNodeCategory(i) === category){
  			counter++;
  		}
  	}
  	return counter;
  };
}
