function xmlDocument(xml){
	this.xml = xml;
	this.getXMLNodeArr = function(){
      return $('span', xml);
	};
	this.getNodeCategory = function(node) {
     return node.getAttribute('category');
  };
  this.getNodeCharPosition = function(node, str) {
    return parseInt(node.lastElementChild.lastElementChild.getAttribute(str));
  };
  this.removeNode = function(index){
  	this.xml.getElementsByTagName('document')[0].getElementsByTagName('span')[index].remove();
  	return this.xml;
  }
}