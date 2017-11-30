window.onload = function (){
    var user = getCookie("Buser");
    if(user!=""){
   $('.userName').html(user);
  }
//前端显示
    $('#dowebok').smoothSlides();
    $('#hot').hover(function(){
        $(this).addClass('hott');
        $(this).removeClass('lowt');
        $('#low').removeClass('hott');
          $('#low').addClass('lowt');
    })
 
     $('#low').hover(function(){
        $(this).removeClass('lowt');
        $(this).addClass('hott');
        $('#hot').removeClass('hott');
        $('#hot').addClass('lowt');
    })
 
//记录分类的cookie
$('#classify li a' ).click(function(index,e){
  console.log($(this).html())
  setCookie("list",$(this).html());
  window.open("./list.html");
})
    var special = document.getElementsByClassName('book-special')[0];
    var list = special.getElementsByTagName('li');
    // alert(list.length)
    var specialinfo = document.getElementsByClassName('special-info');
    var label = document.getElementsByTagName('label');
     var hot = document.getElementById('hot');
         var low = document.getElementById('low');
    hot .onmouseover =function(){
     	// alert("1")
     	$('.book-special-one').show();
     	$('.book-special-two').hide();
     }
    low.onmouseover =function(){
     	$('.book-special-one').hide();
     	$('.book-special-two').show();
     }
    // alert(specialinfo.length)
    for(var j=0;j<list.length;j++){
    	list[j].index=j;  
    	list[j].onmouseover = function(){
    		// alert(specialinfo[j].style.display)
    		specialinfo[this.index].style.display="block";
    		label[this.index].style.display ="none"
    	}
    	list[j].onmouseout = function(){
    		// alert(specialinfo[j].style.display)
    		specialinfo[this.index].style.display="none";
    		label[this.index].style.display ="block"
    	}
    }

    $('.one-move').mouseenter(function(){
    	$('.one').show();$('.two').hide();$('.three').hide();$('.four').hide();
    })
    $('.two-move').mouseenter(function(){
    	$('.two').show();$('.one').hide();$('.three').hide();$('.four').hide();
    })
	$('.three-move').mouseenter(function(){
	    	$('.three').show();$('.one').hide();$('.two').hide();$('.four').hide();
	    })
	$('.four-move').mouseenter(function(){
	    	$('.four').show();$('.one').hide();$('.two').hide();$('.three').hide();
	    })

    var book = document.getElementsByClassName('book');
    // alert(book.length)
    var i=-1;
    $('#pre').click(function(){
    	if(i>=-1){i--;}
    	// alert(i)
    	if(i<-1) {
    		$('#tip').fadeIn(1000);
    		$('#tip').fadeOut(800);
    	}
    	else{animationpre();}
    	
    	
    });
     $('#next').click(function(){
    	if(i<book.length){i++;}
    	if(i>1) {
    		$('#tip').fadeIn(1000);
    		$('#tip').fadeOut(800);
    	}
    	else{
    		animationnext();}
    	   	
    });
    

  function animationpre(){
    	 if(i==-1){   	
    		$('.show-book-two').hide("slow");
    		$('.show-book-one').show('slow');   
    		$('.show-book-three').hide();	
    	}else if(i==0){  
    	 	$('.show-book-three').hide("slow");		
    		$('.show-book-two').show('slow');
    		$('.show-book-one').hide();
    		
    	
    	}
    }
    function animationnext(){
    	if(i==0){    	
    		$('.show-book-one').hide("slow");
    		$('.show-book-two').show('slow');   	
    		$('.show-book-three').hide();   	
    	}else if(i==1){    		
    		$('.show-book-two').hide("slow");
    		$('.show-book-three').show('slow');
    		$('.show-book-one').hide(); 
    	}else if(i==2){	
    		$('.show-book-three').hide("slow");
    		$('.show-book-one').show('slow');
    		$('.show-book-two').hide(); 
    	}
    }

// 进行渲染的dom
    //后台交互
    $.ajax({
        url: "php/index.php",
        async: true,
        type :"post",
        dataType: 'json',
        success:function(data){
            //对页面进行再次渲染
            var len =data.length;
            console.log(len)
            var rand=0;
            $('.bim img').each(function(index,e){
                  e.setAttribute('src',data[parseInt(Math.random()*len)].book_image);
            })
             $('.bimg img').each(function(index,e){//动态加载图片
                   e.setAttribute('src',data[index].book_image);
               });
                  $('.bname').each(function(index,e){//动态展示对应图片的书名
                $(this).html(data[index].book_name);
               });        
              //价格
                 $('.price').each(function(index,e){
                $(this).html(data[index].book_price);
               })
         //简介
                    $('.binfo').each(function(index,e){
                        $(this).html(data[index].book_introduction);
                    })

        },
        error:function(err){
            console.log(err);
             // window.location.href="404.html";
        }
    }
)
    

        // var datalist = $("<option>111</option>");
        // $('#dbinfo').append(datalist)
    //点击事件
    //搜索
    //  $('.form-control').bind('input propertychange',function(){
    

    // $('#star-search').click(function(e){
    //    console.log($(this).siblings().val());//获取输入框的值以找兄弟节点的方式
    // })
        

    // 点击图片进行存储cookie
    var CookieBName;
    $('.show-book .bimg').click(function(){
     
        console.log($(this).siblings('.card-header').children('.bname').html());
        CookieBName = $(this).siblings('.card-header').children('.bname').html();
         setCookie("bName",CookieBName);
  window.location.href="./Bookinformation.html";
    })
    $('.book-list-one .bimg').click(function(){
   
         console.log($(this).siblings('.member-info').children('a').html());
         CookieBName =$(this).siblings('.member-info').children('a').html();
          setCookie("bName",CookieBName);
        window.location.href="./Bookinformation.html";

    })
    $('.book-special .bimg').click(function(){
    
         console.log($(this).siblings('label').html());
         CookieBName = $(this).siblings('label').html();
          setCookie("bName",CookieBName);
          window.location.href="./Bookinformation.html";
    })

//热销请求：

//设置cookie
    function setCookie(cookiename,value){
        var today = new  Date();//当前日期
        var Day = 1;
        var expire = new Date();
        expire.setTime(today.getTime() +Day *24*60*60*1000) ;//设置过期时间
        //判断cookiename 
        document.cookie= cookiename + '=' +escape(value) + ";expires = " +expire.toGMTString();
    }

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
//删除cookie;
function delCookie(cookieName){
    document.cookie = cookieName + "max-age=0";
}






}
