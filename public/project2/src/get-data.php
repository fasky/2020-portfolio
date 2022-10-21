<?php
    // Get cURL resource
    $curl = curl_init();

    // Set options
    $limit = "100";
    $stateCode = "AZ";
    $searchTerm = "";

    if(isset($_GET["limit"])){
        $limit = $_GET["limit"];
    }
    if(isset($_GET["stateCode"])){
        $stateCode = $_GET["stateCode"];
    }
    if(isset($_GET["searchTerm"])){
        $searchTerm = $_GET["searchTerm"];
    }

    $dataURL = 'https://developer.nps.gov/api/v1/parks?';
    
    //if search button was pushed, only searchterm will be set, so just have the url include search for a term option
    if($searchTerm != ""){
        $dataURL = $dataURL . 'api_key=wla4KaDBoAn5yVFfszK4rA8XmaM9sZwa430qHtyj&q=' . $searchTerm . '&fields=entranceFees%2Cimages' . '&limit=' . $limit;
    }
    //if state code is all, search all up to 400 parks
    else if($stateCode == "ALL"){
        $dataURL = 'https://developer.nps.gov/api/v1/parks?limit=' . $limit . '&api_key=wla4KaDBoAn5yVFfszK4rA8XmaM9sZwa430qHtyj' . '&fields=entranceFees%2Cimages';
    }
    //else just search by state
    else{
        $dataURL = $dataURL . 'stateCode=' . $stateCode . '&limit=' . $limit . '&api_key=wla4KaDBoAn5yVFfszK4rA8XmaM9sZwa430qHtyj' . '&fields=entranceFees%2Cimages';
    }
    
    //get data
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $dataURL,
        CURLOPT_USERAGENT => $_SERVER['HTTP_USER_AGENT'],
        CURLOPT_HTTPHEADER => array('Authorization: wla4KaDBoAn5yVFfszK4rA8XmaM9sZwa430qHtyj')
    ));

    // Additional code would follow
    $response = curl_exec($curl); // Send the request, save the response
    //print_r(json_decode($response, true)); // print json decoded response
    echo $response;
    curl_close($curl); // Close request
?>