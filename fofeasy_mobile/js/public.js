$(function(){
   	 //	各页面导入导航栏和底部  	 	
   	$(".load_header").load("./head.html",function(){
   		$(".switch").on("click",function(){
	   		var this_a=$(this).attr("a");
	   		if(this_a==1){
	   			$(this).attr("a",2);
	   			$(".cover").slideUp(200);
	   			$(this).removeClass("glyphicon-remove").addClass("glyphicon-align-justify");
	   		}
	   		if(this_a==2){
	   			$(".cover").slideDown(200);
	   			$(this).attr("a",1);
	   			$(this).removeClass("glyphicon-align-justify").addClass("glyphicon-remove");
	   		}
	   });
	   $(".cover .core_data").on("click",function(){
	   		var data_hide=$(this).data("level");
			if (data_hide==1) {
				$(this).data("level",2);
				$(this).next("ul,div").slideDown(150);
				$(this).find("span:nth-child(2)").removeClass("glyphicon glyphicon-menu-right").addClass("glyphicon glyphicon-menu-down");
			}
			if(data_hide==2){
				$(this).data("level",1);
				$(this).next("ul,div").slideUp(150);
				$(this).find("span:nth-child(2)").removeClass("glyphicon glyphicon-menu-down").addClass("glyphicon glyphicon-menu-right");
			}
	   })
		
	});
	$(".load_footer").load("./foot.html");
	//	跳转申请试用页面
	$("div[data-id='apply-btn']").click(function(){
		window.location.href="applyFor.html";
	})
	//	关于我们图片滚动
	var arr=[1,2,3,0];
	$(".about-con3 .btn-right").click(function(){		
		arr.unshift(arr.pop());
		var divs=$(".about-con3 .page-content .bg>div");
		for(var i=0;i<divs.length;i++){
			var ind="item-index"+arr[i];
			divs.eq(i).removeClass();
			divs.eq(i).addClass("item");
			divs.eq(i).addClass(ind);
			if(arr[i]=="1"){
				divs.eq(i).data('id','btn-left')
			}
		}
	})

	$(".about-con3 .btn-left").click(function(){	
		console.log("888")
		arr.push(arr.shift());
		var divs=$(".about-con3 .page-content .bg>div");
		for(var i=0;i<divs.length;i++){
			var ind="item-index"+arr[i];
			divs.eq(i).removeClass();
			divs.eq(i).addClass("item");
			divs.eq(i).addClass(ind);
		}
	})
	loadFundData();
})



function loadFundData(){
	//获取头部url参数
	var geturlParams = function(url) {
		var theRequest = new Object();
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest
	}
	
	
	var url = location.search; //获取url中"?"符后的字串   
	var name = geturlParams(url).name;
	// 头部菜单滚动
	var mutualNum=8037;
	var mutualOrgNum=133;
	var mutualManageNum=3024;
	var hedgeNum=176083;	
	var hedgeOrgNum=34046;	
	var hedgeManageNum=5567;
	$.ajax({
        url: "https://wxapi.fofeasy.com/base/fund/home/fund_about_count",
//			url: "http://192.168.11.135:8000/base/fund/home/fund_about_count",
        type: 'get',
        contentType: "application/json;charset=utf-8",
        data: {},
        success: function (resp) {
            if(resp.success){
            	var hedgeAll=resp.records.hedge;
            	var mutualAll=resp.records.mutual;
            	var staticdate=resp.records.hedge.date;
            	hedgeNum=hedgeAll.fund;
        		hedgeOrgNum=hedgeAll.org;
        		hedgeManageNum=hedgeAll.person;
        		mutualNum=mutualAll.fund;
        		mutualOrgNum=mutualAll.org;
        		mutualManageNum=mutualAll.person; 
        		//console.info(JSON.stringify(resp))
            	if(name=="hedge"){      
        			$(".private-con #hedge-date").text(staticdate);
        			$(".private-con #hedge-company").text(hedgeOrgNum);
        			$(".private-con #hedge-product").text(hedgeNum);
        			$(".private-con #hedge-manager").text(hedgeManageNum);
            	}else if(name=="mutual"){
            		$(".private-con #mutual-date").text(staticdate);
        			$(".private-con #mutual-company").text(mutualOrgNum);
        			$(".private-con #mutual-product").text(mutualNum);
        			$(".private-con #mutual-manager").text(mutualManageNum);
            	}else if(name=="fofeasy"){
            		$(".easy-con3 #hedge-sum").text(hedgeNum);
        			$(".easy-con3 #mutual-sum").text(mutualNum);
            		$(".easy-con3 .now-date").text(staticdate);
        			var hedgeDiv="";
        			var mutualDiv="";
        			for(var i=0;i<hedgeAll.fund_type.length;i++){
        				hedgeDiv += "<div>"+hedgeAll.fund_type[i].type_name+":"+hedgeAll.fund_type[i].num+"</div>";
        			}
        			for(var i=0;i<mutualAll.fund_type.length;i++){
        				if(mutualAll.fund_type[i].type_name=="其他基金")
        				return;
        				mutualDiv += "<div>"+mutualAll.fund_type[i].type_name+":"+mutualAll.fund_type[i].num+"</div>";
        			}
        			$(".easy-con3 #mutual-con").html(mutualDiv);
    				$(".easy-con3 #hedge-con").html(hedgeDiv);
            	}
            }
        }
    });
}

window.onload=function(){
	var cover_height=$("body").innerHeight()-52;		//获取当前屏幕的高度
	if(cover_height>750){
		$(".cover").height(cover_height+"px");		//设置遮罩层的高度   		
	}	
}

