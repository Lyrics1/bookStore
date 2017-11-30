/*
 *
 * login-register modal
 * Autor: Creative Tim
 * Web-autor: creative.tim
 * Web script: #
 * 
 */
function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('注册');
    }); 
    $('.error').removeClass('alert alert-danger').html('');
       
}
function showLoginForm(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');    
        });
        
        $('.modal-title').html('登录');
    });       
     $('.error').removeClass('alert alert-danger').html(''); 
}

function openLoginModal(){
    showLoginForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}
function openRegisterModal(){
    showRegisterForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}
             var Email = new RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-za-z0-9_-])+/);   //检测邮箱
             var Tel = new RegExp(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[7|3|0|1])\d{8}$/);  //检测手机号
            var userName = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9]{1,20}$/);//汉字，字母数字
            var passWord = new RegExp(/^[a-zA-Z\d_]{8,}$/);//8位数组或者字母



    //登录
 function loginAjax(){
               
               //验证表单数据
             var judge = true;
            // var email = $('.email').eq(0).val();
            // console.log($('.email').eq(0).val());
            var user = $('.user').eq(0).val();
            console.log( $('.user').eq(0).val());
            var pass = $('.password:eq(0)').val();
            console.log($('.password:eq(0)').val());

            if(!(userName.test(user))){
            shakeModal("用户名");
            judge =false;
            }
            if(!(passWord.test(pass))){
                shakeModal("密码");
                judge = false;
            }
            if(judge == true){
                console.log("输入信息正确")
                $.ajax({
                    url:"php/login.php", 
                     async :true, 
                    type :"POST",
                    data: {
                        user: user,
                        password : pass
                    },   
                    success:function(data){ 
                        console.log(data)
                        if(data=="true"){
                        $('.error').html("登录成功");
                        $('.sign_up').hide();
                        $('.sign_in').hide();
                            //返回布尔值，true ，登录成功
                            $('.userName').html(user);
                            setCookie("Buser",user);

                        }else{
                            $('.error').html("用户名或密码错误");
                        }
                    },error :function(err,status){
                     console.log(err,status)
                    // window.location.href="404.html";
                    // alert("后台请求失败")
                }
                   
                })
            }
}
//注册
function loginUpAjax(){
   // let email = $('.email').eq(1).val();''
    let pass =$('.password').eq(1).val();
    let  tel = $('.tel').val();
   let  judge = true;
     var user = $('.user').eq(1).val();
            console.log( $('.user').eq(1).val());
     // console.log($('.email').eq(1).val());
     console.log($('.password').eq(1).val());
     console.log($('.tel').val());
     //验证注册信息正确性
     if(!(userName.test(user))){
        shakeModal("用户名");
        judeg = false;
     }
     if(!(passWord.test(pass))){
             shakeModal("密码");
                judge = false;
     }
     if(!(Tel.test(tel))){
          shakeModal("电话号码");
                judge = false;
     }
       if(judge == true){
                console.log("输入信息正确")

               
                $.ajax({
                    url:"php/loginup.php",
                    data: {
                         user: user,
                        password : pass,
                        tel :tel
                    },
                    type:"POST",
                    async :true,
                    success:function(data){
                        //需要后台传回数据是布尔值：true/false [judge: true]
                            if(data=="true"){
                                // alert("1")
                                //注册成功转到登录界面 
                                $('.error').html("注册成功");

                                showLoginForm();
                            }

                    },
                    error:function(err){
                        console.log(err);
                        $('.error').html("注册失败")
                    }
                })
            }

}

function shakeModal(status){
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html(status+"输入有误，请重新输入");
             if(status=="Email"){
               $('.email').eq(0).val("");
             }
             if(status =="密码"){
                $('.password:eq(0)').val("");
             }
             // $('input[type="password"]').val('');
             setTimeout( function(){ 
                $('#loginModal .modal-dialog').removeClass('shake'); 
    }, 1000 ); 
}


//设置cookie
    function setCookie(cookiename,value){
        var today = new  Date();//当前日期
        var Day = 1;
        var expire = new Date();
        expire.setTime(today.getTime() +Day *24*60*60*1000) ;//设置过期时间
        //判断cookiename 
        document.cookie= cookiename + '=' +escape(value) + ";expires = " +expire.toGMTString();
    }