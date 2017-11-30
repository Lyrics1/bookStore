window.onload = function (){

  
 // 分类
console.log(  $('.book-information label:eq(3) span').html())
 // 读取cookie从服务器请求进行在主界面点击的书籍的展示
  var bookName = getCookie("bName");
console.log(bookName);
//相关书籍从后台请求
 $.ajax({
  url : "php/bookinfo.php",
  type :"POST",
  data:{
    book_name : bookName
  },
  dataType :"json",
  async: true,
  success :function(data){
    // //本书籍
    // $('.bimg img').attr('src',data[0].book_image);
    // $('.book_name').html(data[0].book_name);
    // $('.book-information label:eq(0)').html()//商品编号
    // $('.book-information li:eq(1)').html();//商品价格
    // $('.book-information label:eq(2) span').html()//商品评分
    // $('.book-information label:eq(3) span').html()//作者
    // $('.small-info').html()//书籍简介
    
    
    //相关书籍
  var recommend_img =$('.recommend img');
    var info = $('.book-info ');
    var len = recommend_img.length;
    console.log("len",len)
    for(var i=0;i<len;i++){
      recommend_img[i].src=data[i+1].book_image;
      info[i].innerHTML = data[i+1].book_name;
    }

  },
  error:function(err){
    console.log(err);
  }
 })

//  //相关书籍

var listData =[];//保存相关分类的数据以便进行点击分类排序操作（按销量，价格
 //从其他界面按跳转过来
   var listName = getCookie("list");
//根据分类展示书籍
ajaxList(listName);

//本界面点击进行更新操作：
$('.i' ).click(function(index,e){
  console.log($(this).html())
  bookList=ajaxList($(this).html());


})
var listName = getCookie("list");
console.log(listName);

function addBookCard(){
  var listsBook = $('.lists-book');

    var card = $("<div class='book-card'> <img src='./images/6.jpg'  class='card-img'> <div class='card-info'><li class='bname'></li><li class='autor'></li><li>￥<label style='color:red' class='price'></label></li><li class='sinfo'></li></div></div>");
    listsBook.append(card);

}
function ajaxList(listName){
            $.ajax({
            url:"php/list.php",
            type: "POST",
            dataType:"json",
            async:true,
            data:{
              listName :listName
            },
                    success:function(data){
                     
              showCard(data)
                       window.listData =data;
                       //点击图片进行跳转到详细信息界面进行跳转
                    $('.card-img').on('click',function(){
                        console.log($(this).siblings('.card-info').children('.bname').html());
                        var bName = $(this).siblings('.card-info').children('.bname').html();
                        setCookie("bName",bName);
                        // console.log($('.bname').eq(indexs).html())
                  window.location.href="Bookinformation.html";
                 })
            },
            error:function(err){
              console.log(err)
            }
          })
}

//点击书本排序方式（如销量价格等进行 操作）
setTimeout(function(){console.log( window.listData)
  listData = window.listData;
  console.log( listData)
},3000);
function removeCard(){
  // var listsBook = $('.lists-book');
  var book_card =$('.book-card');
  book_card.remove();
}
$('.sort_price').click(function(){
    removeCard();
   listData=  sortCard(listData,"book_price")
     console.log( "sort",listData)
showCard(listData)

})
function showCard(data){
             var len = data.length;
                  for(var i=0;i<len;i++){
                     addBookCard();
          }
              
  $('.book-card img').each(function(index,e){
                        e.setAttribute("src",data[index].book_image);
                      })
                      $('.bname').each(function(index){
                        $(this).html(data[index].book_name );
                      })
                      $('.autor').each(function(index){
                        $(this).html(data[index].book_writer );
                      })
                       $('.price').each(function(index){
                        $(this).html(data[index].book_price);
                      })
                       $('.sinfo').each(function(index){
                        $(this).html(data[index]. book_introduction );
                      })
}


// showCard(listData,"book_price")
function sortCard(listData,b){
  //按照某种规则进行排序
  //然后返回并展示
  console.log(b)
  var len = listData.length;
  for(var i=0;i<len;i++){
    for(var j=i+1;j<len;j++){
    if((parseFloat(listData[i][b])) >(parseFloat(listData[j][b]))){
        var temp = listData[i];
        listData[i]=listData[j];
        listData[j]=temp;
    }
  }
  }
  return listData;
}


//点击推荐书籍进行cookie记录书名，进行相应的跳转
$('.recommend li div').click(function(){
console.log($(this).html());
setCookie("bName",$(this).html())
window.location.href="./Bookinformation.html";
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
  }
  
})

//热销排行点击跳转
$('.hide-book-list li a').click(function(){
  console.log($(this).html());

  setCookie("bName",$(this).html())
  window.location.href="./Bookinformation.html";
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






 //设置cookie
    function setCookie(cookiename,value){
        var today = new  Date();//当前日期
        var Day = 1;
        var expire = new Date();
        expire.setTime(today.getTime() +Day *24*60*60*1000) ;//设置过期时间
        //判断cookiename 
  document.cookie = cookiename + "=" + escape(value) + ";expires=" + expire.toGMTString();
    }

}