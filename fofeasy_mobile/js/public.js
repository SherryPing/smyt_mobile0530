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
//	   			$(".cover").height(cover_height);		//设置遮罩层的高度  
	   			$(".cover").slideDown(200);
	   			$(this).attr("a",1);
	   			$(this).removeClass("glyphicon-align-justify").addClass("glyphicon-remove");
	   		}
	   });
	   $(".cover .core_data").on("click",function(){
	   		var data_hide=$(this).data("level");
			if (data_hide==1) {
				$(this).data("level",2);
				$(this).next("ul").slideDown(150);
				$(this).find("span:nth-child(2)").removeClass("glyphicon glyphicon-menu-right").addClass("glyphicon glyphicon-menu-down");
			}
			if(data_hide==2){
				$(this).data("level",1);
				$(this).next("ul").slideUp(150);
				$(this).find("span:nth-child(2)").removeClass("glyphicon glyphicon-menu-down").addClass("glyphicon glyphicon-menu-right");
			}
	   })
		
	});
	$(".load_footer").load("./foot.html");
	
})
window.onload=function(){
	var cover_height=$("body").innerHeight()-52;		//获取当前屏幕的高度
	if(cover_height>750){
		$(".cover").height(cover_height+"px");		//设置遮罩层的高度   		
	}
//	$(".cover").height(cover_height+"px");		//设置遮罩层的高度   		
}