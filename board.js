console.log("HELLO WORLD");
var myBoard = new Board(100,100);
myBoard.buildBoard();
myBoard.generateBarriers(8);
var player1 = new Robot(0,0);
var userInterface = new UserInterface(myBoard, player1);

var pathFinder = new PathFinder(myBoard, player1, userInterface);

var elem = document.getElementById("myBoard");
elem.insertAdjacentHTML("beforeend", myBoard.printBoard());

var start = goal = nodeMap =  null;

//var result = pathFinder.generalPathFind(myBoard.board.length-1, myBoard.board.length-1, "myBoard");
var result = pathFinder.A_star(myBoard.board.length-1, myBoard.board.length-1, "myBoard");

if(result != null){
	var path = [];
	var node = result;
	path.push(node);
	while(node.getLastNodes() != null){
		node = node.getLastNodes();
		path.push(node);
	}

	userInterface.highlightPath(path, "myBoard", "general_path");
}
else{
	alert("NO PATH COULD BE FOUND!");
}

function Board(x,y){
	this.board = new Array([]);
	this.x = x;
	this.y = y;
	
	this.printBoard =  function(){
		var table = "<table class='board'>";
		var className = "";
		for(var i = 0; i < this.board.length; i++){
			table += "<tr>";
			for(var j = 0; j < this.board[0].length; j++){
				if(this.board[i][j] === '*'){
					className = "barrier";
				}
				else{
					className = "";
				}
				table += "<td class='" + className + "'>" + this.board[i][j] + "</td>";
			}
			table += "</tr>";
		}
		table += "</table>";
		return table;
	}


	this.buildBoard = function(){
		var new_board = [];
		
		while(new_board.push([]) < this.y);
		for(var i = 0; i < this.x; i++){
			for(var j = 0; j < this.y; j++){
				new_board[i][j] = '';
			}
		}
		this.board = new_board;
	}
	
	//density should be greater than 0 and is used to determine what fraction of the board should be barrier cells
	this.generateBarriers = function(density){
	
		for(var i = 0; i < (this.x*this.y)/density; i++){
			var x = Math.floor(Math.random() * this.x);
			var y = Math.floor(Math.random() * this.y);
			this.board[x][y] = '*';
		}
	}
	
	this.reachable = function(node){
		var node_x = node.getNode().x;
		var node_y = node.getNode().y;
		if(node_x < 0 || node_x >= this.board.length || node_y<0 || node_y >= this.board.length || this.board[node_x][node_y] === '*'){
			return false;
		}
		return true;
	}
}
