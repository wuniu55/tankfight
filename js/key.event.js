// JavaScript Document

	//按键按下事件
	document.onkeydown = function(e){
		e = e?e:window.event;
		var keyCode = e.keyCode;
		//console.log(keyCode);
		if(gamestatus == 1){
			if(keyCode == 87 || keyCode == 68 || keyCode == 83 || keyCode == 65){
				keyList[87] = false;
				keyList[68] = false;
				keyList[83] = false;
				keyList[65] = false;
			}
			if(keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40){
				keyList[37] = false;
				keyList[38] = false;
				keyList[39] = false;
				keyList[40] = false;
			}
			keyList[keyCode] = true;
			if(keyList[74]) heroShoot(heroTank);
			if(keyList[96]) heroShoot(heroTank2);
			if(keyCode == 80){
				mission = mission>1?(mission-1):walls.length-1; //数组默认有key=0
				missionCG();
				setMission();
			}else if(keyCode == 78){
				mission = mission<walls.length-1?(mission+1):1;
				missionCG();
				setMission();
			}
		}
		if(keyCode == 87 || keyCode == 83 || keyCode == 38 || keyCode == 40){
			if(gamestatus == 0){
				if(player == 1){
					player = 2;
				}else{
					player = 1;
				}
				notice();
			}
		}
		
		if(keyCode == 13){
			if(gamestatus == 0){
				initGame();
				missionCG();
				setMission();
			}else if(gamestatus == 1){
				gamestatus = 2;
				clearInterval(playinter);
			}else if(gamestatus == 2){
				playing();
			}else if(gamestatus == 3){
				gamestatus = 0
				CG.x = 0;
				clearInterval(cginter);
				drawCG(CG);
				notice();
			}
		}
	}
	
	//按键弹起事件
	document.onkeyup = function(e){
		e = e?e:window.event;
		var keyCode = e.keyCode;
		keyList[keyCode] = false;
		//alert(keyCode);
	}	