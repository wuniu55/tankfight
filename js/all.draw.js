// JavaScript Document
	//画CG
	function drawCG(CG){
		var img = new Image();
		img.src = 'images/menu.gif';
		cxt.drawImage(img,CG.x,CG.y,mapwidth,mapheight);
	}
	
	//画总部
	function drawLeader(leaderobj){
		var img = new Image();
		img.src = 'images/tankall.gif';
		if(leaderobj.alive == 1)
			cxt.drawImage(img,256,0,32,32,leaderobj.x,leaderobj.y,32,32);
		else
			cxt.drawImage(img,288,0,32,32,leaderobj.x,leaderobj.y,32,32);
	}
	
	//画子弹
	function drawBullet(bullet){
		cxt.fillStyle = "white";
		cxt.fillRect(bullet.x-1,bullet.y-1,3,3);
	}
	
	//画坦克
	function drawTank(tank){
		if(!(tank.blood > 0)) return;
		if(tank.wd > 0){
			cxt.globalAlpha = 0.5;
		}
		var img = new Image();
		img.src = "images/tankall.gif";
		var imgx,imgy;
		imgy = 0;
		switch(tank.direct){
			case 0:
				imgx = 0;
				break;
			case 1:
				imgx = 32*3;
				break;
			case 2:
				imgx = 32;
				break;
			case 3:
				imgx = 32*2;
				break;
		}
		if(tank.type == 2){
			imgx += 32*4;
		}
		if(tank.type == 7){
			imgy += 32;
		}
		if(tank.type == 8){
			imgx += 32*4;
			imgy += 32;
		}
		if(tank.type == 9){
			imgy += 32*2;
			if(tank.blood == 2) imgx += 32*4;
			if(tank.blood == 1) imgx += 32*8;
		}
		cxt.drawImage(img,imgx,imgy,32,32,tank.x,tank.y,32,32);
		cxt.globalAlpha = 1;
	}
	
	//画墙
	function drawWalls(){
		for(var i = 0;i<wallobj.length;i++){
			if(wallobj[i].alive){
				var img = new Image();
				img.src = "images/tankall.gif";
				var imgy = 32*3;
				switch(wallobj[i].type){
					case 1:
						var imgx = 0;
						break;
					case 2:
						var imgx = 16*1;
						break;
					case 3:
						var imgx = 16*3;
						break;         
					case 4:
						cxt.globalAlpha =0.8;
						var imgx = 16*2;
						break;                  
				} 
				cxt.drawImage(img,imgx,imgy,wallSize,wallSize,wallobj[i].x,wallobj[i].y,wallSize,wallSize);
				cxt.globalAlpha =1;
			}
		}
	}
	
	//画炸弹
	function drawBombs(){
		var img = new Image();
		img.src = 'images/tankall.gif';
		for(var i in Bombs){
			if(Bombs[i]['status'] == 0) continue;
			if(Bombs[i]['type'] == 1){ //坦克爆炸
				var imgy = 160,imgw = 64,imgh = 64;
				var imgx = (Bombs[i]['status']-1)*64;
				if(Bombs[i]['status'] == 4) imgx = 64;
			}
			if(Bombs[i]['type'] == 2){ //子弹爆炸
				var imgy = 0,imgw = 32,imgh = 32;
				var imgx = (Bombs[i]['status']+9)*32;
				if(Bombs[i]['status'] == 4) imgx = (2+9)*32;
			}
			cxt.drawImage(img,imgx,imgy,imgw,imgh,Bombs[i].x,Bombs[i].y,imgw,imgh);
		}
	}
	
	//画buffer
	function drawBuffer(buffer){
		if(buffer.alive <= 0) return;
		if(buffer.alive > 300 || buffer.alive % 60 < 30){
			var img = new Image();
			img.src = 'images/tankall.gif';
			var imgx = 256 + buffer.type*30 - 30;
			var imgy = 110;
			cxt.drawImage(img,imgx,imgy,30,30,buffer.x,buffer.y,30,30);
		}
	}
	
	//画坦克cg
	function drawTankCG(tankcg){
		if(tankcg.alive > 0 && tankcg.alive < 29){
			var img = new Image();
			img.src = 'images/tankall.gif';
			var imgx = Math.ceil(tankcg.alive/4)*32 + 7*32;
			var imgy = 32;
			cxt.drawImage(img,imgx,imgy,30,30,tankcg.x,tankcg.y,30,30);
		}
	}