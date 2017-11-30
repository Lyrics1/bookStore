window.onload = function (){

console.log(	$('.book-information label:eq(3) span').html())
 //读取cookie从服务器请求进行在主界面点击的书籍的展示
 var bookName =  getCookie("bName");
console.log(bookName);
 //本书籍从后台请求
 $.ajax({
 	url : " php/bookinfo.php",
 	type :"POST",
 	data:{
 		book_name : bookName
 	},
 	dataType :"json",
 	async: true,
 	success :function(data){
 		var len =data.length;
 		$('.bimg img').attr('src',data[len-1].book_image);
 		$('.book_name').html(data[len-1].book_name);
 		$('.book-information label:eq(0)').html(data[len-1].book_id)//商品编号
 		$('.book-information li:eq(1) label').html(data[len-1].book_price);//商品价格
 		$('.book-information label:eq(2) span').html()//商品评分
 		$('.book-information label:eq(3) span').html(data[len-1].book_writer)//作者
 		$('.small-info').html(data[len-1].book_introduction)//书籍简介
 		
 		var recommend_img =$('.recommend img');
 		var info = $('.book-info ');
 		var len = recommend_img.length;
 		console.log("len",len)
 		for(var i=0;i<len;i++){
 			recommend_img[i].src=data[i+1].book_image;
 			info[i].innerHTML = data[i+1].book_name;
 		}


 		// $('.recommend img').each(function(index,e){
 		// 	e.setAttribute('src',data[index].book_image);
 		// })
 		// $('.book-info ').each(function(index){
 		// 	$(this).html(data[index].book_introduction);
 		// })
 	},
 	error:function(err){
 		console.log(err);
 	}
 })

//相关书籍



//点击推荐书籍进行cookie记录书名，进行相应的跳转
$('.recommend li ').click(function(){
console.log($(this).children('.book-info').html());
setCookie("bName",$(this).children('.book-info').html())
window.location.href="./Bookinformation.html";
})

 var date= new Date();//今天日期，后台按照这个时间向前推测最近用户所浏览的商品
//历史记录
$.ajax({
	url :"",
	type:"POST",
	dataType:"json",
	data:{
		today: date
	},
	async :true,
	success:function(data){
		$('.history img').each(function(index,e){
			e.setAttribute('src',data[index].book_image);
		})
	},
	error:function(err){
		console.log(err);
	}
})
//热销排行请求
$.ajax({
  url:"",
  async : true,
  type : "POST",
  dataType :'json',
  success:function(data){
    $('.recommend li div').each(function(index){
      $(this).html(data[index].book_name);
    })
  },error:function(err){
  	console.log(err);
  }
  
})

//热销排行点击跳转
$('.hide-book-list li a').click(function(){
  console.log($(this).html());

  setCookie("bName",$(this).html())
window.location.href="./Bookinformation.html";
})
var clickCount = 0;
setInterval(function(){
	clickCount=0;
}, 3000);
//点击添加到购物车
//
var user=getCookie('Buser');

$('.add-car').click(function(){
	if(user!==""){


	if(clickCount >1){
		$('.show-info').hide();
		$('.show-info').show();
		$('.show-info').html("抱歉，系统正繁忙");
		$('.show-info').hide(2500);
	}else{
		clickCount++;
	$.ajax({
		url:"php/addCar.php",
		type:"POST",
		async:true,
		data:{
			book_id: $('.book-information label:eq(0)').html(),
			userName:getCookie("Buser")
		},//返回true/false
		success:function(data){
			console.log(data)
			if(data=="true"){
				$('.show-info').show();
				$('.show-info').html("购物车添加成功");
				$('.show-info').hide(2200);
				// setTimeout(function(){
				// 	window.location.href="storCar.html";
				// }, 2000)
				
			
		}else{
			$('.show-info').show();
			$('.show-info').html("购物车添加失败");
			$('.show-info').hide(2200);

			
		}
			
		},error:function(){
			$('.show-info').show();
			$('.show-info').html("抱歉，系统正繁忙");
			$('.show-info').hide(2500);
			// console.log("此书不可出售");
		}
	})
}}else{
	$('.show-info').show();
		$('.show-info').html("请先登录");
		$('.show-info').hide(2500);
}
})


 //获取cookie  
 function getCookie(cookieName)  
{  
    var cookieValue = document.cookie;  
    var cookieStartAt = cookieValue.indexOf(""+cookieName+"=");  
    if(cookieStartAt==-1)  
    {  
        cookieStartAt = cookieValue.indexOf(cookieName+"=");  
    }  
    if(cookieStartAt==-1)  
    {  
        cookieValue = null;  
    }  
    else  
    {  
        cookieStartAt = cookieValue.indexOf("=",cookieStartAt)+1;  
        cookieEndAt = cookieValue.indexOf(";",cookieStartAt);  
        if(cookieEndAt==-1)  
        {  
            cookieEndAt = cookieValue.length;  
        }  
        cookieValue = unescape(cookieValue.substring(cookieStartAt,cookieEndAt));//解码latin-1  
    }  
    return cookieValue;  
}  

}