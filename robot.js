var player = new Robot(0,0);


function Robot(x, y){
	this.pos_x = x;
	this.pos_y = y;
	
	this.move = function(direction){
		if(direction === "UP" && this.pos_x > 0){
			--this.pos_x;
		}
		else if( direction === "DOWN"){
			++this.pos_x;
		}
		else if( direction === "LEFT" && this.pos_y > 0){
			--this.pos_y;
		}
		else if( direction === "RIGHT" ){
			++this.pos_y
		}
	}

	this.setPosition = function(x, y){
		this.pos_x = x;
		this.pos_y = y;
	}
}



Array.prototype.containsArray = function(val) {
    var hash = {};
    for(var i=0; i<this.length; i++) {
        hash[this[i]] = i;
    }
    return hash.hasOwnProperty(val);
}

Array.prototype.containsNode = function(val) {
    var hash = {};
    for(var i=0; i<this.length; i++) {
        if(val.equals(this[i])){
			return true;
		}
    }
    return false;
}

Array.prototype.indexOfNode = function(val) {
    var hash = {};
    for(var i=0; i<this.length; i++) {
        if(val.equals(this[i])){
			return i;
		}
    }
    return -1;
}

function heuristic(node, goal){
	var D = 1;
	goal = goal.getNode();
	node = node.getNode();
    dx = Math.abs(node.x - goal.x);
    dy = Math.abs(node.y - goal.y);
    return Math.abs(dx - dy);
}

function distance(node, goal){
	var D = 1;
	goal = goal.getNode();
	node = node.getNode();
    dx = Math.pow(Math.abs(node.x - goal.x),2);
    dy = Math.pow(Math.abs(node.y - goal.y),2);
    return Math.floor(Math.sqrt(dx + dy));
}