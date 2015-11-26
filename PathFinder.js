function PathFinder(board, robot, userInterface){
	this.board = board;
	this.robot = robot;
	this.ui = userInterface;
	
	this.generalPathFind = function(goal_x, goal_y, elem){
		var start = new Node(new Cell(this.robot.pos_x, this.robot.pos_y));
		var goal = new Node(new Cell(goal_x, goal_y));
		var nodes = null;
				
		var visited = [];
		var frontier = [];

		var node = start;
		
		//add start node to frontier
		frontier.push(start);
		while(!node.equals(goal) && frontier.length > 0){
			this.robot.setPosition(node.getNode().x, node.getNode().y);

			this.ui.highlightCell(elem, this.robot.pos_x, this.robot.pos_y);
			if(frontier.length > 0){
				node = frontier.shift();
			}
			//add the current node to the list of visited nodes
			visited.push(node);

			//add all squares reachable from current node to frontier list
			this.addAllReachableNodesToFrontier(node, frontier, visited);
		}
		
		if(node.equals(goal)){
			return node;
		}
		else{
			return null;
		}
			
	}
	
	//still needs to made to function like djikstras algorithm
	this.djikstra = function(goal_x, goal_y, elem){
		var start = new Node(new Cell(this.robot.pos_x, this.robot.pos_y));
		var goal = new Node(new Cell(goal_x, goal_y));
		var nodes = null;
				
		var visited = [];
		var frontier = [];

		var node = start;
		
		//add start node to frontier
		frontier.push(start);
		while(!node.equals(goal) && frontier.length > 0){
			this.robot.setPosition(node.getNode().x, node.getNode().y);

			this.ui.highlightCell(elem, this.robot.pos_x, this.robot.pos_y);
			if(frontier.length > 0){
				node = frontier.shift();
			}
			//add the current node to the list of visited nodes
			visited.push(node);

			//add all squares reachable from current node to frontier list
			this.addAllReachableNodesToFrontier(node, frontier, visited);
		}
		
		if(node.equals(goal)){
			return node;
		}
		else{
			return null;
		}
			
	}
	
	this.A_star = function(goal_x, goal_y, elem){
		var start = new Node(new Cell(this.robot.pos_x, this.robot.pos_y));
		start.cost = 1;
		var goal = new Node(new Cell(goal_x, goal_y));
		var nodes = null;
				
		var visited = [];
		var frontier = [];

		var node = start;
		
		//add start node to frontier
		frontier.push(node);
		
		while(!node.equals(goal) && frontier.length > 0){
			this.robot.setPosition(node.getNode().x, node.getNode().y);

			this.ui.highlightCell(elem, this.robot.pos_x, this.robot.pos_y);
			this.ui.showCost(elem, this.robot.pos_x, this.robot.pos_y, node.cost);
			//get next lowest cost node
			var index = 0;
			for(var i = 0; i < frontier.length; i++){
				if(frontier[i].cost < frontier[index].cost){
					index = i;
				}
			}

			node = frontier[index];
			frontier.splice(index-frontier.length,1);
			
			//add the current node to the list of visited nodes
			visited.push(node);

			//add all squares reachable from current node to frontier list
			var neighbors = this.getReachableNodes(node);
			var new_cost = 0;
			for(var i = 0; i < neighbors.length; i++){
				if(!visited.containsNode(neighbors[i]) ){
					new_cost = node.cost + 1 + heuristic(neighbors[i], goal);

					if(frontier.containsNode(neighbors[i]) && frontier[frontier.indexOfNode(neighbors[i])].cost > new_cost){
							frontier[frontier.indexOfNode(neighbors[i])].cost = new_cost;
					}
					else if(!frontier.containsNode(neighbors[i])){
						neighbors[i].cost = new_cost;
						frontier.push(neighbors[i]);
					}
				}
			}
		}
		
		if(node.equals(goal)){
			return node;
		}
		else{
			return null;
		}
			
	}
	
	this.getReachableNodes = function( node){
		//get all nodes
		//var node1 = [node[0]+1, node[1]];
		var node1 = new Node(new Cell(node.getNode().x+1, node.getNode().y));
		var node2 = new Node(new Cell(node.getNode().x-1, node.getNode().y));
		var node3 = new Node(new Cell(node.getNode().x, node.getNode().y+1));
		var node4 = new Node(new Cell(node.getNode().x, node.getNode().y-1));

		var neighbors = [];
		
		//add nodes to a list
		if(this.board.reachable(node1)){
			node1.setLastNodes(node);
			node.addToNextNodes(node1);
			neighbors.push(node1);
		}
		if(this.board.reachable(node2)){
			node2.setLastNodes(node);
			node.addToNextNodes(node2);
			neighbors.push(node2);
		}
		if(this.board.reachable(node3)){
			node3.setLastNodes(node);
			node.addToNextNodes(node3);
			neighbors.push(node3);
		}
		if(this.board.reachable(node4)){
			node4.setLastNodes(node);
			node.addToNextNodes(node4);
			neighbors.push(node4);
		}
		
		return neighbors;
	}
	
	this.addAllReachableNodesToFrontier = function( node, frontier, visited){
		//get all nodes
		//var node1 = [node[0]+1, node[1]];
		var node1 = new Node(new Cell(node.getNode().x+1, node.getNode().y));
		var node2 = new Node(new Cell(node.getNode().x-1, node.getNode().y));
		var node3 = new Node(new Cell(node.getNode().x, node.getNode().y+1));
		var node4 = new Node(new Cell(node.getNode().x, node.getNode().y-1));

		
		
		//add nodes to a list
		if(this.board.reachable(node1) && !frontier.containsNode(node1) && !visited.containsNode(node1)){
			node1.setLastNodes(node);
			node.addToNextNodes(node1);
			
			frontier.push(node1);
			
		}
		if(this.board.reachable(node2) && !frontier.containsNode(node2) && !visited.containsNode(node2)){
			node2.setLastNodes(node);
			node.addToNextNodes(node2);
			frontier.push(node2);
		}
		if(this.board.reachable(node3) && !frontier.containsNode(node3) && !visited.containsNode(node3)){
			node3.setLastNodes(node);
			node.addToNextNodes(node3);
			frontier.push(node3);
		}
		if(this.board.reachable(node4) && !frontier.containsNode(node4) && !visited.containsNode(node4)){
			node4.setLastNodes(node);
			node.addToNextNodes(node4);
			frontier.push(node4);
		}
	}
}