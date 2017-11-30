<?php
	include "DButil.php";
	header("Content-Type: text/html;charset=utf-8");
	$dbname="bookstore";
	$bookName = $_POST['listName'];
	
	$con = mysqli_connect($severname,$username,$password,$dbname);
	 if(!$con){
	 	echo 'Can not connect database';
	 }
	 $con->set_charset("utf8");//设置插入数据库的字符集
	$sql = "select * from book where book_type = '".$bookName."'";
	// var_dump($sql);

	$result = mysqli_query($con,$sql);
	while($row=  mysqli_fetch_assoc($result)){
		$rows[] = $row;
	}
	
	echo json_encode($rows);
?>