<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

<title>SuperBlockchain Pool</title>

</head>

<body>
<?php

$Name = $_POST['Name'];
$Email = $_POST['Email'];
$Message = $_POST['Message'];

if ($Name=='' || $Email=='' || $Message==''){ 

echo "<script>alert('Fields marked with * are required.');location.href ='javascript:history.back()';</script>";

}else{


    require("class.phpmailer.php");
    $mail = new PHPMailer();

    $mail->From     = $Email;
    $mail->FromName = $Name; 
    $mail->AddAddress("EMAIL"); // Address to which the messages will arrive.

// Here are the data that will appear in the email you receive.

    $mail->WordWrap = 50; 
    $mail->IsHTML(true);     
    $mail->Subject  =  "Contact"; // Message Subject.
    $mail->Body     =  "Name: $Name \n<br />". // User Name.
    "Email: $Email \n<br />". 
    "Message: $Message \n<br />"; // User Message.

// SMTP server data, we can use Google, Outlook, etc ...

    $mail->IsSMTP(); 
    $mail->Host = "ssl://smtp.gmail.com:465";
    $mail->SMTPAuth = true; 
    $mail->Username = "EMAIL";
    $mail->Password = "PASSWORD"; 

    if ($mail->Send())
    echo "<script>alert('Form sent successfully, we will respond as soon as possible.');location.href ='javascript:history.back()';</script>";
    else
    echo "<script>alert('Error submitting form.');location.href ='javascript:history.back()';</script>";

}

?>
</body>
</html>