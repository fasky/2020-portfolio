<?php
   $mysqli = new mysqli("localhost", "faskmggq_fasky", "Vazzyz716", "faskmggq_portprojects");
   $myArray = array();
   $sql = 'SELECT * FROM `Projects` WHERE 1';
   if ($result = $mysqli->query($sql)) {
      while($row = $result->fetch_array(MYSQLI_ASSOC)) {
              $myArray[] = $row;
      }
      echo json_encode($myArray);
  }
  
  $result->close();
  $mysqli->close();

?>