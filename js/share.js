//读取当前登录用户名，展示在界面上
//判断cookie 是否存在，存在则隐藏登录和注册，和显示用户名
   $('.sign_up').show();
                        $('.sign_in').show();
  var user = getCookie("Buser");
  if(user!=""){
   $('.userName').html(user);
    $('.sign_up').hide();
                        $('.sign_in').hide();

  }
//点击购物车进行跳转
$('.tip li:eq(0)').click(function(){

  window.location.href="storCar.html";
  return false;
})
  //前端显示
  $('.YY').bind('input propertychange',function(){
       console.log($(this).val())//监听输入框内容改变事件
    
            $.ajax({
                url :"php/search.php",
                async :true,
                type :"POST",
               dataType : "json",
                data :{
                    book_name : $(this).val()
                },
                success:function(data){
                     var len =data.length;
                // JSON.parse(data)
                    console.log(data);    
                  console.log(data.length);
                    for(var i=0;i<5;i++){
                        var num = i;
                          var datalist = $("<option></option>");
                          $('#dbinfo').append(datalist);
                          $('option').each(function(index,e){
                            $(this).val(data[index].book_name);
                          })
                    }
                  

                },
                error :function(err,status){
                     console.log(err,status)
                    // window.location.href="404.html";
                    // alert("后台请求失败")
                }
            })

    })

  //下拉列表
  $('.book-list li:first-child').click(function(e){
  	$('.hide-book-list').toggle();
  	e.stopPropagation()
  })
 // $(document).click(function(){
 //    e.stopPropagation()
 // 	$('.hide-book-list').hide();
 // })

//分类
$('.i a' ).click(function(index,e){
  console.log($(this).html())
  setCookie("list",$(this).html());
  console.log($(this).index())
     window.location.href="./list.html";
})

 //设置cookie
    function setCookie(cookiename,value){
        var today = new  Date();//当前日期
        var Day = 1;
        var expire = new Date();
        expire.setTime(today.getTime() +Day *24*60*60*1000) ;//设置过期时间
        //判断cookiename 
  document.cookie = cookiename + "=" + escape(value) + ";expires=" + expire.toGMTString();
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
  var date = new Date();
  date.setTime(date.getTime()-10000);
  // document.cookie=cookieName+"= ; expire="+date.toGMTString()+"; path=/software";
  document.cookie=cookieName+"= ; expire="+date.toGMTString();
}
// 点击退出删除cookie
$('.sign_out').click(function(){
  // alert("k");
     delCookie("Buser");
        $('.userName').html("");
          $('.sign_up').show();
                        $('.sign_in').show();

});

//datalist选中事件
$('#star-search').click(function(){
  var bName = $('.YY').val();
  // console.log(bName)
setCookie("bName",bName);
 window.open("./Bookinformation.html");
});
//如果鼠标焦点在input里面.则按enter键可以进行搜索
// $('.YY').focus(function(){

  
      $('.YY').keydown(function(e){
          if($('.YY').val()!==""){
        var key =e.which;
        if(key==13){
           e.preventDefault();  
            var bName = $('.YY').val();
          setCookie("bName",bName);
           window.open("./Bookinformation.html");
        }   }
      })

      $('.SS').click(function(){
         var bName = $('.YY').val();
          setCookie("bName",bName);
          if(bName!="")
          {console.log("LL")
           // window.open("./Bookinformation.html");
           }else{
            // alert("LL")
           }
      })
 
      
 //大家都在搜


