<?php
require '../util.php';
$config = (require '../../config.php');
$blockHeader = fetch_reward($config['api']);
$rewardRaw = $blockHeader['reward'];
$reward = number_format($rewardRaw / 100, 2, ".", "");
print_r($reward);
?>