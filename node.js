function Node(node){
	this.last = null;
	this.next = new Array();
	this.node = node;
	this.cost = 999999;
	
	this.getNode = function(){
		return node;
	}
	
	this.getLastNodes = function() {
		return this.last;
	}
	
	this.getNextNodes = function(){
		return this.next;
	}
	
	this.setLastNodes = function(node) {
		this.last = node;
	}
	
	this.addToNextNodes = function(node) {
		this.next.push(node);
	}
	
	this.equals = function(node) {
	   if(this.getNode().x == node.getNode().x && this.getNode().y == node.getNode().y){
			return true;
	   }

	   return false;
	}
}