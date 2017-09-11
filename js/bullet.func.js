// JavaScript Document
	//子弹消亡  撞边界 撞墙 英雄子弹撞敌（拓展——撞队员）  敌方子弹撞敌方 敌方子弹撞英雄  子弹互撞
	function bulletDie(){
		for(var i in Bullets){
			if(Bullets[i].alive != 1) break;
			leaderKill(Bullets[i],leaderobj);
			mapKill(Bullets[i]);
			for(var j in Bullets){
				if(Bullets[i].alive != 1) break;
				if(Bullets[i] != Bullets[j] && Bullets[i].direct != Bullets[j].direct){
					bulletKill(Bullets[i],Bullets[j]);
				}
			}
			for(var j in wallobj){
				if(wallobj[j].alive > 0){
					wallKill(Bullets[i],wallobj[j])
				}
				if(Bullets[i].alive <= 0) break;
			}
			if(Bullets[i].alive < 1){
				Bullets[i].alive = 0;
			}
		}
		for(var i in hBullets){
			if(hBullets[i].alive != 1) break;
			for(var j in enemy){
				if(hBullets[i].alive != 1) break;
				tankKill(hBullets[i],enemy[j],true);
			}
		}
		for(var i in eBullets){
			if(eBullets[i].alive != 1) break;
			tankKill(eBullets[i],heroTank,true);
			tankKill(eBullets[i],heroTank2,true);
			for(var j in enemy){
				if(eBullets[i].alive != 1) break;
				tankKill(eBullets[i],enemy[j],false);
			}
		}
	}
	
	//子弹碰到墙
	function wallKill(bullet,wall){
		var r1 = getRect(bullet);
		var r2 = wallRect(wall);
		if(!rectRule(r1,r2)) return false;
		switch(wall.type){
			case 1:
				wall.alive = 0;
				bullet.alive -= 0.6;
				if(bullet.alive > 0){
					var bb = new bomb(bullet.x-16,bullet.y-16,2);
					Bombs.push(bb);
					bullet.oftank.bulletNum ++;
				}else{
					bullet.alive = 0;
				}
				break;
			case 2:
				if(bullet.oftank.espeed >= 14) wall.alive = 0;
				bullet.alive -= 0.6;
				if(bullet.alive > 0){
					var bb = new bomb(bullet.x-16,bullet.y-16,2);
					Bombs.push(bb);
					bullet.oftank.bulletNum ++;
				}else{
					bullet.alive = 0;
				}
				break;
			case 3:
			case 4:
			case 5:
				break;
									
		}
		return true;
	}
	
	//子弹碰到边界
	function mapKill(bullet){
		switch(bullet.direct){
			case 0:
				if(bullet.y <= 0 && bullet.alive == 1){
					var bb = new bomb(bullet.x-16,bullet.y-16,2);
					Bombs.push(bb);
					bullet.alive = 0;
					bullet.oftank.bulletNum ++;
				}
				break;
			case 1:
				if(bullet.x >= mapwidth && bullet.alive == 1){
					var bb = new bomb(bullet.x-16,bullet.y-16,2);
					Bombs.push(bb);
					bullet.alive = 0;
					bullet.oftank.bulletNum ++;
				}
				break;
			case 2:
				if(bullet.y >= mapheight && bullet.alive == 1){
					var bb = new bomb(bullet.x-16,bullet.y-16,2);
					Bombs.push(bb);
					bullet.alive = 0;
					bullet.oftank.bulletNum ++;
				}
				break;
			case 3:
				if(bullet.x <= 0 && bullet.alive == 1){
					var bb = new bomb(bullet.x-16,bullet.y-16,2);
					Bombs.push(bb);
					bullet.alive = 0;
					bullet.oftank.bulletNum ++;
				}
				break;
		}
	}
	//子弹碰到坦克
	function tankKill(bullet,tank,hurt){
		if(bullet.x >= tank.x && bullet.x <= tank.x + (tankSize-1) && bullet.y >= tank.y && bullet.y <= tank.y + (tankSize-1) && bullet.alive == 1 && tank.blood > 0 && bullet.oftank != tank){
			var bb = new bomb(bullet.x-16,bullet.y-16,2);
			Bombs.push(bb);
			bullet.alive = 0;
			bullet.oftank.bulletNum ++;
			if(hurt && tank.wd <= 0){
				tank.blood --;
				if(tank.blood <= 0){
					var bb = new bomb(tank.x-16,tank.y-16,1);
					Bombs.push(bb);
					var sound = document.getElementById("tankCracksound");
					if(tank == heroTank || tank == heroTank2){
						sound = document.getElementById("playerCracksound");
						tank.blood ++;
						tank.life --;
						tank.wd = 500;
						tank.espeed = 8;
						tank.x = parseInt(mapwidth/32/2)*32-32*2+1;
						tank.y = mapheight-32+1;
						if(tank == heroTank2){
							tank.x = parseInt(mapwidth/32/2)*32+32*2+1;
							tank.y = mapheight-32+1;
						}
						if(heroTank.life < 0 && heroTank2.life < 0) gameover();
					}
					sound.play();
					for(var i in enemy){
						if(tank == enemy[i]){
							getEnemy();
							break;
						}
					}
				}
			}
		}
	}
	//子弹碰到总部
	function leaderKill(bullet,leaderobj){
		if(bullet.alive != 1 || leaderobj.alive != 1) return;
		if(bullet.x >= leaderobj.x && bullet.x <= leaderobj.x + (32-1) && bullet.y >= leaderobj.y && bullet.y <= leaderobj.y + (32-1)){
			var bb = new bomb(bullet.x-16,bullet.y-16,2);
			Bombs.push(bb);
			bullet.alive = 0;
			bullet.oftank.bulletNum ++;
			leaderobj.alive = 0;
			gameover();
		}
	}
	
	//子弹碰到子弹
	function bulletKill(bullet1,bullet2){
		if(bullet1 == bullet2) return false;
		if(bullet1.alive == 0 || bullet2.alive == 0) return false;
		var r1 = getRect(bullet1);
		var r2 = getRect(bullet2);
		if(rectRule(r1,r2)){
			var bb = new bomb(bullet1.x-16,bullet1.y-16,2);
			Bombs.push(bb);
			var bb = new bomb(bullet2.x-16,bullet2.y-16,2);
			Bombs.push(bb);
			bullet1.alive = bullet2.alive = 0;
			bullet1.oftank.bulletNum ++;
			bullet2.oftank.bulletNum ++;
		}
	}
	
	//清除对象数组中死亡的子弹对象(防止游戏时间过长时，变量臃肿导致帧率变低)
	function clearBullets(){
		var tm = [];
		for(var i in Bullets){
			if(Bullets[i].alive != 0){
				tm.push(Bullets[i]);
			}
		}
		Bullets = tm;
		
		tm = [];
		for(var i in hBullets){
			if(hBullets[i].alive != 0){
				tm.push(hBullets[i]);
			}
		}
		hBullets = tm;
		
		tm = [];
		for(var i in eBullets){
			if(eBullets[i].alive != 0){
				tm.push(eBullets[i]);
			}
		}
		eBullets = tm;
	}
	
	//kill所有子弹  防止英雄子弹飞 导致发射数没回复
	function killAllBullets(){
		for(var i in Bullets){
			Bullets[i].alive = 0;
			Bullets[i].oftank.bulletNum ++;
		}
	}