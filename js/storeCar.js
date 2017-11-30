window.onload=function(){
	var user =getCookie('Buser');
	if( user!=""){
	//请求
	$.ajax({
		url :"php/storCar.php",
		type:"POST",
		async:true,
		data:{
			user:user
		},
		dateType:"json",
		success:function(data){
			//进行页面添加,返回对用用户的购物车全部信息
			var len =data.lenght;
			if(len<0){
				var div =$("<div class='not'>您的购物车是空的！<a href='index.html'>点击主页进行选购</a></div>");
				$('.container').append(div);
				
			}
			else{
				for(var i=0;i<len;i++){
					var div =$("<div class='store'><div class='choose ''><input type='checkbox' ></div><div class='stor-img'><img src='images/6.jpg' style='width:100px ;height:100px;'></div><div class='stor-info'><p class='bookn'>rrr</p><label> </label></div><div class='stor-price'>￥<label class='a'> 33.0</label></div><div class='stor-count'><div class='input-group  '><span class='input-group-addon reduce'> - </span><input type='text' class='form-control count' value='1' ><span class='input-group-addon add' > + </span></div></div><div class='stor-price-all'>￥<label class='o'>0</label></div><div class='else'><button class='btn btn-warning delete'>删除</button></div></div>")
					$('.container').append(div);
					}
				$('.stor-img img').each(function(index){
					$(this).attr('src',data[index].book_image)
				})
				$('.bookn').each(function(index){
					$(this).html(data[index].book_name)
				})
				$('.bookn label'  ).each(function(index){
					$(this).html(data[index].book_introduction)
				});
				$('.a'  ).each(function(index){
					$(this).html(data[index].book_price)
				});
				$('.count' ).each(function(index){
					$(this).html(data[index].book_count);
				});
			}
		},error:function(err){
				console.log(err);
				var div =$("<div class='not'>404 NOT　FOUND</div>");
				$('.container').append(div);
		}	
	})
}else{
	var div =$("<div class='not'>请先进行登录！</div>");
				$('.container').append(div);
}
	$('.ALL').html( ALL());
	$('.choose-all').click(function(){
		if(this.checked){
			$('.container :checkbox').prop("checked",true);
			$('.ALL').html( ALL())

		}else{
			$('.container :checkbox').prop("checked",false);
			$('.ALL').html( ALL())
		}
	})
	$('.add').click(function(){
		// console.log($('.add').index(this));
		var list = $('.add').index(this);
		if($('.count').eq(list).val()>=0  ){
			$('.count').eq(list).val( parseInt($('.count').eq(list).val())+1);
			// console.log($('.o').html())
			$('.o').eq(list).html( (parseInt($('.a').eq(list).html()) * $('.count').eq(list).val() ));

			
		}
		$('.ALL').html( ALL())
	})
	$('.reduce').click(function(){
		// console.log($('.reduce').index(this));
		var list = $('.reduce').index(this);
		if($('.count').eq(list).val()>0){
			$('.count').eq(list).val( parseInt($('.count').eq(list).val())-1);
			$('.o').eq(list).html( (parseInt($('.a').eq(list).html()) * $('.count').eq(list).val() ));
		}
			$('.ALL').html( ALL())
	})
	$('.count').change(function(e){

		var list = $('.count').index(this);
		$('.o').eq(list).html( (parseInt($('.a').html()) * $('.count').eq(list).val() ));

	})

	$('.delete').click(function(){
		var list = $('.delete').index(this);
		
		var bookName = $('.bookn').html();
		//向购物车表发起请求，删除一条记录，根据书名
		$.ajax({
			url:" ",
			type:"POST",
			dataType:"json",
			data:{
				bookName:bookName
			},
			async:true,
			success:function(data){
				console.log("success");
				$('.store').eq(list).hide();
			},error:function(err){
				console.log(err);
			}
			
		})
	})

	$('.submit').click(function(){
		$('.')
	})

	//ALL
	function ALL(){
		var price=0;
		$('.o').each(function(){
			price =price+ parseInt($(this).html());
		})
		return price;
	}
	$('.none').click(function(){
		//删除所有的记录
		$.ajax({
			url:" ",
			type:"POST",
			dataType:"json",
			data:{
				bookName: "all"
			},
			async:true,
			success:function(data){
				console.log("success");
				$('.store').each(function(){
					$(this).hide();
				})
			},error:function(err){
				console.log(err);
			}
			
		})
	})



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