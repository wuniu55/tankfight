// JavaScript Document
	//关卡 CG
	function missionCG(){
		gamestatus = 4;
		clearInterval(playinter);
		var times = 0;
		var h = 0;
		msinter = setInterval(function(){
			times++;
			h = times*10;
			//console.log(h);
			if(times*10 <= mapheight/2+10){
				cxt.fillStyle = '#999999';
				cxt.fillRect(0,0,mapwidth,h);
				cxt.fillRect(0,mapheight-h,mapwidth,h);
			}else if(times*10 > mapheight/2+10 && times*10 <= mapheight/2+10*20){
				//console.log(times*10 + '||' +(mapheight/2+10*10));
				cxt.font = '25px Arial';
				cxt.strokeStyle = '#000000';
				cxt.strokeText('STAGE ' + mission,mapwidth/2-50,mapheight/2+8);
			}else if(times*10 > mapheight/2+10*20){
				//alert(1);
				h = times*10 - (mapheight/2+10*20);
				cxt.clearRect(0,0,mapwidth,mapheight);
				drawWalls();
				cxt.fillRect(0,0,mapwidth,mapheight/2-h);
				cxt.fillRect(0,mapheight/2 + h,mapwidth,mapheight/2-h);
				if(h > mapheight/2){
					clearInterval(msinter);
					var sound = document.getElementById("startsound");
					sound.play();
					playing();
				}
			}
		},40)
	}
	
	//结束动画
	function overCG(){
		CG.x = mapwidth;
		CG.y = 0;
		cginter = setInterval(function(){
			CG.x -= 10;
			if(CG.x <= 0){
				gamestatus = 0;
				CG.x = 0;
				clearInterval(cginter);
				notice();
				return;
			}
			drawCG(CG);
			//console.log(CG);
		},40);
	}
	
	//提示信息
	function notice(){
		cxt.clearRect(0,0,10000,10000);//清除区域
		var img = new Image();
		img.src = 'images/menu.gif';
		cxt.drawImage(img,0,0,mapwidth,mapheight);
		img.src = 'images/tankall.gif';
		if(player == 1) var y = 197;
		else var y = 219;
		cxt.drawImage(img,32*4,32*3,28,28,110,y,25,25);
	}
	
	

	