

function transfer(timeStamp){
	var ymd=new Date();
	ymd.setTime(timeStamp*1000);
	var month=(ymd.getMonth()+1).toString();
	var date=ymd.getDate().toString();
	return month+"-"+date;
}

function change(htmlobj,current){
	$(".header li").removeClass("current");
	$(".header "+current).addClass("current");
	var json=JSON.parse(htmlobj.responseText);
	$("body .content").empty();
	for(var i=0;i<json.length;i++){
		$("body .content").append("<li><small>"+transfer(json[i].created)+"</small><a  href='"+json[i].url+"'>"+json[i].title+"</a>("+json[i].replies+")</li>");
	}
	$("body a").click(function(){
		chrome.tabs.create({ url: $(this).attr("href"), selected:false });
	});  
}
document.addEventListener('DOMContentLoaded', function () {	       
   $(".hot").click(function(){
		htmlobj=$.ajax({url:"https://www.v2ex.com/api/topics/hot.json",dataType:"json",async:false});
	    change(htmlobj,".hot"); 
   });   
   $(".new").click(function(){
		htmlobj=$.ajax({url:"https://www.v2ex.com/api/topics/latest.json",dataType:"json",async:false});
	    change(htmlobj,".new"); 
   });
	 $(".new").click();   
});
