<?php 
	include "DButil.php";
	header("Content-Type: text/html;charset=utf-8");
	$dbname="bookstore";
	$bookID = $_POST['book_id'];
	$userName = $_POST['userName'];
	$con = mysqli_connect($severname,$username,$password,$dbname);
	 if(!$con){
	 	echo 'Can not connect database';
	 }
	 $con->set_charset("utf8");//设置插入数据库的字符集

	$sql = "select user_id from users where user_name = '".$userName."'";
	
	//查询书籍状态 如果可以则返回true,反之则是false
	$bookStatusSql = "select * from book where book_id = '" .$bookID."'";

	$bookstatus  = mysqli_query($con,$bookStatusSql);

	$bookStatus =  mysqli_fetch_assoc($bookstatus);
	// var_dump($bookStatus);
//如果书本可以出售，status是1，才可以购买
	if($bookStatus['book_status'] ==1){
		$date = date('Y-m-d', time());
		$status =1;
		$result = mysqli_query($con,$sql);
		$userID = mysqli_fetch_assoc($result);
		// var_dump($userID);
		$insertSql = "insert  into  orders (user_id,order_time,order_price,order_status) values(" .$userID['user_id'].",".$date.",".$bookStatus['book_price'].",".$status.")";
		// var_dump($insertSql);
		$result = mysqli_query($con,$insertSql);	
		// var_dump($result);
		if( $result){
			echo "true";
		}
		else echo "false";
	}else{
		echo "false";
	}

	
	
	
	
	


?>