
function UserInterface(board, robot){
	this.board = board;
	this.robot = robot;
	
	this.highlightCell = function(elementId, x, y){
		var elem = document.getElementById(elementId);
		elem.children[0].rows[x].children[y].className = "robot_position";
	}
	
	this.showCost = function(elementId, x, y, cost){
		var elem = document.getElementById(elementId);
		elem.children[0].rows[x].children[y].innerHTML = cost;
	}
	
	this.highlightPath = function(path, elementId, className){
		var elem = document.getElementById(elementId);
		for(var i = 0; i < path.length; i++){
			elem.children[0].rows[path[i].getNode().x].children[path[i].getNode().y].className = className;
		}
	}
}