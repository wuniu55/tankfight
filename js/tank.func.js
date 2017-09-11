
// JavaScript Document
	//英雄射击
	function heroShoot(heroTank){
		if(heroTank.blood > 0 && heroTank.bulletNum > 0){
			var sound = document.getElementById("attacksound");
			sound.play();
			var bullet = new bullets(heroTank);
			heroTank.bulletNum --;
			hBullets.push(bullet);
			Bullets.push(bullet);
		}
	}
	
	//英雄坦克移动
	function heroTankMove(){
		if(heroTank.blood > 0){
			if(keyList[87]){ heroTank.direct = 0;heroTank.run();}
			if(keyList[68]){ heroTank.direct = 1;heroTank.run();}
			if(keyList[83]){ heroTank.direct = 2;heroTank.run();}
			if(keyList[65]){ heroTank.direct = 3;heroTank.run();}
		}
		if(heroTank2.blood > 0){
			if(keyList[38]){ heroTank2.direct = 0;heroTank2.run();}
			if(keyList[39]){ heroTank2.direct = 1;heroTank2.run();}
			if(keyList[40]){ heroTank2.direct = 2;heroTank2.run();}
			if(keyList[37]){ heroTank2.direct = 3;heroTank2.run();}
		}
	}
	
	//敌方坦克移动
	function enemyTankMove(){
		if(enemyruns <=0){ //配合定时器buffer
			enemyruns ++;
			return;
		}
		for(var i = 0;i < enemy.length;i++){
			if(enemy[i].blood>0){
				var rand = Math.random();
				if(rand < 0.33) rand = 1;
				else if(rand <0.66) rand = 2;
				else rand = 3;
				if(!checkMove(enemy[i])){
					switch(enemy[i].direct){
						case 0:
							var drt = {"1":1,"2":2,"3":3};
							enemy[i].direct = drt[rand];
							break;
						case 1:
							var drt = {"1":0,"2":2,"3":3};
							enemy[i].direct = drt[rand];
							break;
						case 2:
							var drt = {"1":1,"2":0,"3":3};
							enemy[i].direct = drt[rand];
							break;
						case 3:
							var drt = {"1":1,"2":2,"3":0};
							enemy[i].direct = drt[rand];
							break;
					}
				}
				enemy[i].run();
				//移动的同时发射子弹
				if(enemy[i].bulletNum > 0){
					var ebullet = new bullets(enemy[i]);
					if(enemy[i].shoot >= 100){
						enemy[i].shoot = 0;
						enemy[i].bulletNum --;
						eBullets.push(ebullet);
						Bullets.push(ebullet);
					}else{
						enemy[i].shoot += 3;
					}
				}
			}
		}
	}
	
	//检查坦克能否移动
	function checkMove(tank){
		if(!(tank.blood > 0)) return;
		if(tank.direct == 0 && tank.y - tank.speed <= 0){ tank.y = 0 + 1; return false;}
		if(tank.direct == 1 && tank.x + tank.speed + (tankSize-1) >= mapwidth){ tank.x = mapwidth - (tankSize-1); return false;}
		if(tank.direct == 2 && tank.y + tank.speed + (tankSize-1) >= mapheight){ tank.y = mapheight - (tankSize-1); return false;}
		if(tank.direct == 3 && tank.x - tank.speed <= 0){ tank.x = 0 + 1; return false;}
		var r1 = tankRect(tank,3);
		//坦克互卡
		for(var i in tanks){ 
			if(tanks[i] !== tank && tanks[i].blood > 0){
				r2 = tankRect(tanks[i],0);
				if(rectRule(r1,r2)) {
					return false;
				}
			}
		}
		//总部卡位
		var r2 = leaderRect(leaderobj);
		if(rectRule(r1,r2)) {
			resetPosition(tank,r2);
			return false;
		}
		//墙壁卡位
		for(var i in wallobj){ 
			if(wallobj[i].alive == 1 && wallobj[i].type != 4){
				var r2 = wallRect(wallobj[i]);
				if(rectRule(r1,r2)) {
					resetPosition(tank,r2);
					return false;
				}
			}	
		}		
		//其他卡位
		//......
		return true;
	}
	
	//得到敌方坦克对象
	function getEnemy(){
		if(enemy_key >= enemys[mission].length){
			var pass = true;
			for(var i in enemy){
				if(enemy[i].blood > 0){
					pass = false;
					break;
				}
			}
			if(pass){
				var temtm = setTimeout(function(){
					mission = mission<walls.length-1?(mission+1):1;
					missionCG();
					setMission();
					clearTimeout(temtm);
				},3000);
			}
			return false;
		}
		var len = (mapwidth-32)/2;
		var x = (create_site-1)*len + 1;
		var type = enemys[mission][enemy_key];
		var em = new tank(x,0,2,2,type);
		var tankcg = new tankCG(em);
		tankcg.alive = 25*3;
		tankcgs.push(tankcg);
		switch(type){
			case 7:
				//em.blood ++;
				break;
			case 8:
				em.speed += 3;
				break;
			case 9:
				em.blood += 2;
				em.speed --;
				break;
			
		}
		em.blood -= 99;
		var tm1 = setTimeout(function(){
			if(em) em.blood += 99;
			clearTimeout(tm1);
		},3000);
		var it1 = setInterval(function(){
			if(tankcg){
				tankcg.alive -- ;
				if(tankcg.alive <= 0){
					clearInterval(it1);
				}
			}else{
				clearInterval(it1);
			}
		},40);
		enemy.push(em);
		tanks.push(em);
		enemy_key++;
		if(++create_site > 3) create_site = 1;
	}
	
	//摧毁所有地方坦克
	function killAllEnemy(){
		for(var i in enemy){
			if(enemy[i].blood > 0){
				enemy[i].blood = 0;
				var bb = new bomb(enemy[i].x-16,enemy[i].y-16,1);
				Bombs.push(bb);
				var sound = document.getElementById("tankCracksound");
				sound.play();
				getEnemy();
			}
		}
	}
	
	//修复坦克位置
	function resetPosition(tank,rect){
		switch(tank.direct){
			case 0:
				tank.y = rect['y2'] + 1;
				break;
			case 1:
				tank.x = rect['x1'] - tankSize;
				break;
			case 2:
				tank.y = rect['y1'] - tankSize;
				break;
			case 3:
				tank.x = rect['x2'] + 1;
				break;
		}
		//console.log('x:'+tank.x+' y:'+tank.y);
	}
	