<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, 'http://seedpro2.zent.cash:21698/info');
$result = curl_exec($ch);
$obj = json_decode($result, TRUE);
curl_close($ch);
print_r($obj['difficulty']);
?>