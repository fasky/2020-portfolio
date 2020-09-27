<?php
    $conn = mysqli_connect("localhost", "faskmggq_fasky", "Vazzyz716", "faskmggq_portprojects");
    $sql = 'SELECT * FROM `Projects` WHERE 1';
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
           echo "Title: " . $row["title"]. "<br>";
        }
     } else {
        echo "0 results";
     }
     mysqli_close($conn);
?>