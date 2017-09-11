// JavaScript Document

	//定义坦克
	function tank(x,y,direct,speed,type){
		this.x = x;
		this.y = y;
		this.bulletNum = 1;
		this.direct = direct;
		this.speed = speed;
		this.espeed = 8;
		this.type = type;
		this.blood = 1;
		this.life = 0;
		this.wd = 0;
		this.shoot = 100;
		this.run = function(){
			//if(this == heroTank || this == heroTank2) console.log('run ready...');
			if(!checkMove(this)) return false;
			if(this == heroTank || this == heroTank2){
				var sound = document.getElementById("movesound");
				sound.play();
			}
			//if(this == heroTank || this == heroTank2) console.log('run begin..');
			switch(this.direct){
				case 0: //up
					this.y -= this.speed;
					break;
				case 1: //right
					this.x += this.speed;
					break;
				case 2: //down
					this.y += this.speed;
					break;
				case 3: //left
					this.x -= this.speed;
					break;
			}
		}
	}
	
	//子弹类
	function bullets(tank){
		this.power = 1;
		this.alive = 1;
		this.oftank = tank;
		this.len = 6; //延伸的长度，不包括起点，即总长度减1
		this.speed = tank.espeed;
	    this.direct = tank.direct;
		switch(tank.direct){
			case 0:
				this.y = tank.y;
				this.x = tank.x+16;
				this.run = function(){
					this.y -= this.speed;
				}
				break;
			case 2:
				this.x = tank.x+16;
				this.y = tank.y +32;
				this.run = function(){
					this.y += this.speed;
				}
				break;
			case 1:
				this.x = tank.x + 32;
				this.y = tank.y + 16;
				this.run = function(){
					this.x += this.speed;
				}
				break;
			case 3:
				this.y = tank.y + 16;
				this.x = tank.x;
				this.run = function(){
					this.x -= this.speed;
				}
				break;
		}
	}
	
	//墙类
	function Walls(x,y,type){
		this.alive = 1;
		this.x = x,
		this.y = y;
		this.type = type;
	}
	
	//总部 类
	function leader(x,y){
		this.x = x;
		this.y = y;
		this.alive = 1;
	}
	
	//CG类
	function CG(x,y){
		this.x = x;
		this.y = y;
	}
	
	//坦克出生cg
	function tankCG(tank){
		this.x = tank.x;
		this.y = tank.y;
		this.alive = 50;
	}
	
	//爆炸类
	function bomb(x,y,type){
		this.x = x;
		this.y = y;
		this.type = type;
		this.tn = 0;
		this.status = 1;
	}
	//道具增益类
	function buffer(x,y,type){
		this.x = x;
		this.y = y;
		this.type = type;
		this.alive = 1000;
	}