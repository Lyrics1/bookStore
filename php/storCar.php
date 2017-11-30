<?php 
	include "DButil.php";
	header("Content-Type: text/html;charset=utf-8");
	$dbname="bookstore";
	
	$userName = $_POST['user'];
	$con = mysqli_connect($severname,$username,$password,$dbname);
	 if(!$con){
	 	echo 'Can not connect database';
	 }
	 $con->set_charset("utf8");//设置插入数据库的字符集

	$sql = "select user_id from users where user_name = '".$userName."'";
	$result = mysqli_query($con,$sql);
	$userID = mysqli_fetch_assoc($result);
	$sql = "select * from orders where user_id = '".$userID['user_id']."'";
	// var_dump($sql);
	$result = mysqli_query($con,$sql);
	while($row =mysqli_fetch_assoc($result) ){
		$rows[]=$row;
	}
	echo json_encode($rows);
	
	

	
	
	
	
	


?>