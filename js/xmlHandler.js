'use strict';

function XmlDocument(xml) {
  this.xml = xml;
  this.getXMLNodeArr = function() {
    return $('span', xml);
  };
  this.getNodeCategory = function(node) {
    return node.getAttribute('category');
  };
  this.getNodeCharPosition = function(node, str) {
    return parseInt(node.lastElementChild.lastElementChild.getAttribute(str));
  };
  this.removeNode = function(index) {
    this.xml.getElementsByTagName('document')[0].getElementsByTagName('span')[index].remove();
    return this.xml;
  };
  this.editNode = function(index, newCat) {
    this.xml.getElementsByTagName('document')[0].getElementsByTagName('span')[index].setAttribute('category', newCat);
    return this.xml;
  };
  this.getCategories = function(nodeArr){
  	var categories = [];
  	for (var i = 0; i < nodeArr.length; i++){
  		if (categories.indexOf(this.getNodeCategory(nodeArr[i])) === -1) {
  			categories.push(this.getNodeCategory(nodeArr[i]));
  		}
  	}
  	return categories;
  }
  this.getCategoryCount = function(nodeArr, category){
  	var counter = 0
  	for (var i = 0; i < nodeArr.length; i++) {
  		if (this.getNodeCategory(nodeArr[i]) === category){
  			counter++;
  		}
  	}
  	return counter;
  };
}
