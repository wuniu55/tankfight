// JavaScript Document

	//系统参数定义(全局变量)
	var gamestatus = 3; //0游戏结束 1，游戏进行 2，游戏暂停 3,过场cg 4、切关cg
	var player = 1; // 玩家人数
	var CG = new CG(0,0);
	var keyList = {};
	var tanks = [];
	var hBullets = [];
	var eBullets = [];
	var Bullets = [];
	var Bombs = [];
	var leaderobj; //总部对象
	var mapwidth = document.getElementById("tankcanvas").width;
	var mapheight = document.getElementById("tankcanvas").height;
	var xySize = 32;//标准格子尺寸
	var tankSize = xySize-3;//坦克尺寸
	var wallSize = xySize/2;//墙壁尺寸
	var leaderSize = xySize//总部尺寸
	var cxt = document.getElementById("tankcanvas").getContext("2d");
	var heroTank;
	var heroTank2;
	var enemyColor;	//敌方坦克
	var enemy = [];
	var playinter;
	var msinter;
	var cginter;
	var ncinter;
	var mission = 1;
	var wallobj = [];
	var tankcgs = [];
	var enemy_key = 0;
	var create_site = 1;
	var buffer_num = 0;
	var bufferobj;
	var enemyruns = 1;
	var gbtimer = 0;
	
