// JavaScript Document
	//设置炸弹属性变化
	function updateBombs(){
		for(var i in Bombs){
			Bombs[i]['tn']++;
			if(Bombs[i]['tn']>=2 && Bombs[i]['tn']<4) Bombs[i]['status'] = 2;
			if(Bombs[i]['tn']>=4 && Bombs[i]['tn']< 6) Bombs[i]['status'] = 3;
			if(Bombs[i]['tn']>=6 && Bombs[i]['tn']<9) Bombs[i]['status'] = 4;
			if(Bombs[i]['tn']>=9) Bombs[i]['status'] = 0;
		}
	}
	
	//清理无效炸弹变量
	function clearBombs(){
		var tm = [];
		for(var i in Bombs){
			if(Bombs[i]['status'] != 0){
				tm.push(Bombs[i]);
			}
		}
		Bombs = tm;
	}
	