<?php
	include "DButil.php";
	header("Content-Type: text/html;charset=utf-8");
	$dbname="bookstore";
	$bookName = $_POST['book_name'];
	
	$con = mysqli_connect($severname,$username,$password,$dbname);
	 if(!$con){
	 	echo 'Can not connect database';
	 }
	 $con->set_charset("utf8");//设置插入数据库的字符集
	$sql = "select * from book where book_name = '".$bookName."'";
	// var_dump($sql);

	$result = mysqli_query($con,$sql);
	while($row=  mysqli_fetch_assoc($result)){
		$rows[] = $row;
	}
	$typeSql = "select book_type_id from book where book_name = '".$bookName."'";

	$type =  mysqli_query($con,$typeSql);

	$typeID = mysqli_fetch_assoc($type);
	
	$sameSql = "select * from book where book_type_id = '".$typeID['book_type_id']."'";
	$same =  mysqli_query($con,$sameSql);

	while($sameBook = mysqli_fetch_assoc($same)){
		$sameBooks[] = $sameBook;
	}
	//查询历史记录
	// $sql = "select "
	//热销排行；
	
	// $row = array_combine($row,$sameBooks);要求数组数目相同
	 $row = array_merge_recursive($sameBooks,$rows);
	echo json_encode($row);
?>