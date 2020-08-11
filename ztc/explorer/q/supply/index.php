<?php
require '../util.php';
$config = (require '../../config.php');
$supply = fetch_supply($config['api']);
print_r($supply);
?>