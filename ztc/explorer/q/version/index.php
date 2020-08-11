<?php
require '../util.php';
$config = (require '../../config.php');
$info = fetch_info($config['api']);
$version = $info['version'];
echo "v";
print_r($version);
?>