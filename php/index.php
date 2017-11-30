<?php
	include 'DButil.php' ;
	header("Content-Type: text/html;charset=utf-8");
	// $dbname = $_POST['name'];
	  //htmlspecialchars 使 > < 转化为html实体
	 // $dbname = htmlspecialchars($name);
	 $dbname= "bookstore";

	 $con = mysqli_connect($severname,$username,$password,$dbname);
	 if(!$con){
	 	echo 'Can not connect database';
	 }
	 $con->query("SET NAMES utf8");
	  //设置数据库的编码方式，以防造成前端传到数据库的中文乱码
     	$con->set_charset("utf8");
	 // "要进行解析"，'直接执行'
	 // $sql = "select book_name book_image book_introduction book_price  from '".$dbname."' 
	 // where book_id >=((select MAX(book_id) from '".$dbname."'      ) -(select MIN(book_id) from '".$dbname."'   )) *RAND() +(select MIN(book_id) from '".$dbname."' ) limit 4";
	 
	 // mysqli_master_query(link, query)在主从主机中强制在主机中查找
	 
	 // $sql = "select book_name ,book_image ,book_introduction, book_price from book where book_id>=(select floor (max(book_id)*rand()) from book) order by book_id limit 4";
	 
	 $sql ="select book_name ,book_image ,book_introduction, book_price from book";
	 $result = mysqli_query($con,$sql);//执行查询

	 //接受结果集
	 while($row = mysqli_fetch_assoc($result)){
	 	// $row->set_charset("utf8")
	 	$rows[]=$row;
	 }
	 // var_dump($rows);?
//count($rows)数组大小
	 echo json_encode($rows);//返回JSON数据类型数据


?>