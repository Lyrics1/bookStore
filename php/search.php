<?php
	include 'DButil.php';
	header("Content-Type: text/json;charset=utf-8");
	$dbname="bookstore";
	$search = $_POST['book_name'];

	//创建连接
	 $con = mysqli_connect($severname,$username,$password,$dbname);
	 if(!$con){
	 	echo 'Can not connect database';
	 }
	 $con->set_charset("utf8");//设置插入数据库的字符集
	 $sql ="select book_name from book where book_name like '%".$search."%'";
	 // var_dump($sql);
 	$result = mysqli_query($con,$sql);
	 while($row = mysqli_fetch_assoc($result)){
	 	
	 	$rows[]=$row;
	 }
	// var_dump(count($rows)) ;
	echo json_encode($rows);



?>