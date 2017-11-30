<?php
	include "DBUtil.php";
	 $dbname= "bookstore";
	$con = mysql_connect($severname,$username,$password,$dbname);
	if(!$con){
		echo "Can not connect database";
	}
	var $i =0;
	// while($i<100){
	/*$sql="insert into book (book_id,book_name,book_image,book_writer,book_introduction,book_price) values (109,'TTT','img' ,'kk','iiiii',23)";
	$result = mysqli_query($con,$sql) or die("sql 语句执行失败");*/
	$i++;
	// }
// echo "jjj";
	// mysql_close($con);
	// $sql= "insert book_name,book_image,book_writer,book_introduction,book_price into book values("天马行空","images/","Lyrics","南方姑娘你是否适应北方的秋凉",23)";

?>