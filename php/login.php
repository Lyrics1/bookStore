<?php 
	include "DButil.php";
	header("Content-Type: text/html;charset=utf-8");
	$dbname="bookstore";
	$userName = $_POST['user'];
	$passWord = $_POST['password'];
	$con = mysqli_connect($severname,$username,$password,$dbname);
	 if(!$con){
	 	echo 'Can not connect database';
	 }
	 $con->set_charset("utf8");//设置插入数据库的字符集
	$sql = "select user_id from users where user_name = '" .$userName."' and PASSWORD = '".$passWord."'";
	// var_dump($sql);

	$result = mysqli_query($con,$sql);
	$rows=mysqli_num_rows($result);
	
	// var_dump($result);
	if( $rows!=0){
		echo "true";
	}
	else echo "false";
	


?>