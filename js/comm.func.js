// JavaScript Document
	//公用函数
	//获取子弹的轨迹区域
	function getRect(bullet){
		var x1,x2,y1,y2;
		var len = parseInt((xySize - wallSize)/2);
		switch(bullet.direct){
			case 0:
				x1 = bullet.x - len;
				x2 = bullet.x + len;
				y1 = bullet.y - len;
				y2 = bullet.y + len + bullet.speed;
				break;
			case 1:
				x1 = bullet.x - len - bullet.speed;
				x2 = bullet.x + len;
				y1 = bullet.y - len;
				y2 = bullet.y + len;
				break;
			case 2:
				x1 = bullet.x - len;
				x2 = bullet.x + len;
				y1 = bullet.y - len - bullet.speed;
				y2 = bullet.y + len + bullet.speed;
				break;
			case 3:
				x1 = bullet.x - len;
				x2 = bullet.x + len + bullet.speed;
				y1 = bullet.y - len;
				y2 = bullet.y + len;
				break;
		}
		return {'x1':x1,'x2':x2,'y1':y1,'y2':y2,};
	}
	
	//坦克区域
	function tankRect(tank,flag){
		var x1,x2,y1,y2;
		if(flag == 0){
			x1 = tank.x;
			x2 = tank.x + (tankSize - 1);
			y1 = tank.y;
			y2 = tank.y + (tankSize - 1);
		
		}else if(flag == 3){
			switch(tank.direct){
				case 0:
					x1 = tank.x;
					x2 = tank.x + (tankSize - 1);
					y1 = tank.y - tank.speed;
					y2 = tank.y - 1;
					break;
				case 1:
					x1 = tank.x + tankSize;
					x2 = tank.x + (tankSize - 1) + tank.speed;
					y1 = tank.y;
					y2 = tank.y + (tankSize - 1);
					break;
				case 2:
					x1 = tank.x;
					x2 = tank.x + (tankSize - 1);
					y1 = tank.y + tankSize;
					y2 = tank.y + (tankSize - 1) + tank.speed;
					break;
				case 3:
					x1 = tank.x - tank.speed;
					x2 = tank.x - 1;
					y1 = tank.y;
					y2 = tank.y + (tankSize - 1);
					break;
			}
		}else{
			switch(tank.direct){
				case 0:
					x1 = tank.x;
					x2 = tank.x + (tankSize - 1);
					y1 = tank.y - tank.speed;
					y2 = tank.y + (tankSize - 1);
					break;
				case 1:
					x1 = tank.x;
					x2 = tank.x + (tankSize - 1) + tank.speed;
					y1 = tank.y;
					y2 = tank.y + (tankSize - 1);
					break;
				case 2:
					x1 = tank.x;
					x2 = tank.x + (tankSize - 1);
					y1 = tank.y;
					y2 = tank.y + (tankSize - 1) + tank.speed;
					break;
				case 3:
					x1 = tank.x - tank.speed;
					x2 = tank.x + (tankSize - 1);
					y1 = tank.y;
					y2 = tank.y + (tankSize - 1);
					break;
			}
		}
		return {'x1':x1,'x2':x2,'y1':y1,'y2':y2,};
	}
	
	//墙壁区域
	function wallRect(wall){
		var x1,x2,y1,y2;
		x1 = wall.x;
		x2 = wall.x + (wallSize - 1);
		y1 = wall.y;
		y2 = wall.y + (wallSize - 1);
		return {'x1':x1,'x2':x2,'y1':y1,'y2':y2,};
	}
	
	//总部区域
	function leaderRect(leader){
		var x1,x2,y1,y2;
		x1 = leader.x;
		x2 = leader.x + (leaderSize - 1);
		y1 = leader.y;
		y2 = leader.y + (leaderSize - 1);
		return {'x1':x1,'x2':x2,'y1':y1,'y2':y2,};
	}
	
	//判断区域叠加
	function rectRule(r1,r2){
		if(r1['x1'] <= r2['x2'] && r1['x2'] >= r2['x1'] && r1['y1'] <= r2['y2'] && r1['y2'] >= r2['y1']){
			return true;
		}
		return false;
	}
	
	//是否在数组中
	function in_array(str,arr){
		for(var i in arr){
			if(str == arr[i]) return true;
		}
		return false;
	}