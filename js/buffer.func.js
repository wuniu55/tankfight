// JavaScript Document
	//buffer创建与设定
	function setBuffer(){
		buffer_num ++;
		if(buffer_num%650 == 649){
			var rand = Math.random();
			var x = Math.max(mapwidth*rand-30+1,1);
			var y = Math.max(mapheight*rand-30+1,1);
			rand = Math.random();
			var type = Math.round(rand*6) + 1; // type =  1~6
			bufferobj = new buffer(x,y,type);
		}
		if(bufferobj.alive > 0){
			bufferobj.alive -= 3; //每次扣减存活值
		}
	}
	//buffer触发
	function getBuffer(buffer,heroTank){
		if(buffer.alive <= 0) return;
		if(heroTank.blood <= 0) return;
		if(heroTank.x + (tankSize-1) >= buffer.x && buffer.x + (tankSize-1) >= heroTank.x && heroTank.y + (tankSize-1) >= buffer.y && buffer.y + (tankSize-1) >= heroTank.y ){
				buffer.alive = -1;
				document.getElementById('propsound').play();
				switch(buffer.type){
					case 1:
						heroTank.life ++;
						break;
					case 2:
						enemyruns = -300;
						break;
					case 3:
						gbtimer = 500;
						break;
					case 4:
						killAllEnemy();
						break;
					case 5:
						heroTank.espeed = Math.min(14,heroTank.espeed+2);
						break;
					case 6:
						heroTank.wd = 500;
						break;
				}
		}
	}
	
	//得钢板buffer
	function getGB(){
		if(gbtimer <=0) return;
		var bx = (mapwidth/xySize-1)/2*xySize-wallSize+1;
		var by = mapheight-wallSize+1;
		var gbwalls = [(bx)+'|'+(by),(bx)+'|'+(by-wallSize),(bx)+'|'+(by-wallSize*2),(bx+wallSize)+'|'+(by-wallSize*2),(bx+wallSize*2)+'|'+(by-wallSize*2),(bx+wallSize*3)+'|'+(by-wallSize*2),(bx+wallSize*3)+'|'+(by-wallSize),(bx+wallSize*3)+'|'+(by),];
		for(var i in wallobj){
			var wall = (wallobj[i].x)+'|'+(wallobj[i].y);
			if(in_array(wall,gbwalls)){
				wallobj[i].alive = 1;
				if(gbtimer > 150 || gbtimer%60 > 30){
					wallobj[i].type = 2;
				}else{
					wallobj[i].type = 1;
				}
			}
		}
		gbtimer--;
	}