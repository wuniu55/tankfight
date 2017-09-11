// JavaScript Document
	//得到墙对象(初始化)
	function getWalls(){
		wallobj = [];
		for(var row in walls[mission]){
			for(var col in walls[mission][row]){
				if(walls[mission][row][col] != 0){
					var x = wallSize*col + 1;
					var y = wallSize*row + 1;
					var wall = new Walls(x,y,walls[mission][row][col]);
					wallobj.push(wall);
				}
			}
		}
	}