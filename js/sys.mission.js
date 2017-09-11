// JavaScript Document
	//开始游戏
	function playing(){
		//if(gamestatus == 1) return;
		gamestatus = 1;
		playinter = setInterval(function(){
			bulletDie();
			clearBullets();
			heroTankMove();
			enemyTankMove();
			updateBombs();
			clearBombs();
			setBuffer();
			getBuffer(bufferobj,heroTank);
			getBuffer(bufferobj,heroTank2);
			getGB();
			if(heroTank.wd > 0) heroTank.wd -- ;
			if(heroTank2.wd > 0) heroTank2.wd -- ;
			freshMap();
		},40);
	}
	
	//设置游戏重开数据(比如坦克须重置)
	function initGame(){
		clearInterval(cginter);
		clearInterval(ncinter);
		mission = 1;
		heroTank = new tank(1,1,0,4,1);
		heroTank.life = 2;
		heroTank2 = new tank(1,1,0,4,2);
		heroTank2.life = 2;
		if(player != 2){
			heroTank2.blood = 0;
			heroTank2.life = 0;
		}
		leaderobj = new leader((mapwidth/32-1)/2*32+1,mapheight-32+1);
	}
	
	
	//设置关卡初始数据
	function setMission(){
		killAllBullets();
		enemy_key = 0;
		create_site = 1;
		buffer_num = 0;
		eBullets = [];
		hBullets = [];
		Bullets = [];
		Bombs = [];
		wallobj = [];
		getWalls();
		enemy = [];
		tanks =  []; //错误日志：tanks=enemy=[];这样赋值会当作对象传递，结果为tanks即为enemy，对enemy的操作也会同时对tanks操作
		heroTank.x = parseInt(mapwidth/32/2)*32-32*2+1;
		heroTank.y = 32*10+1;
		heroTank.direct = 0;
		heroTank.wd = 500;
		if(player == 2){
			heroTank2.x = parseInt(mapwidth/32/2)*32+32*2+1;
			heroTank2.y = 32*10+1;
			heroTank2.direct = 0;
			heroTank2.wd = 0;
		}
		heroTank.wd = 0;
		gbtimer = 0;
		enemyruns = 1;
		buffer_num = 0;
		tanks.push(heroTank);
		tanks.push(heroTank2);
		bufferobj = new buffer(-100,-100,0);
		getEnemy();
		getEnemy();
		getEnemy();
	}
	
	//刷新画布
	function freshMap(){
		cxt.clearRect(0,0,1000,1000);//清除区域
		for(var i in Bullets){
			if(Bullets[i].alive == 1){
				Bullets[i].run();
				drawBullet(Bullets[i]);
			}
		}
		for(var i in tankcgs){
			drawTankCG(tankcgs[i]);
		}
		for(var i in tanks){
			drawTank(tanks[i]);
		}
		drawWalls();
		drawBombs();
		drawLeader(leaderobj);
		drawBuffer(bufferobj);
	}
	
	//游戏结束
	function gameover(){
		gamestatus = 3;
		clearInterval(playinter);
		overCG();
		//console.log('gamestatus='+gamestatus);
	}