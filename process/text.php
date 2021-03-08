<?php

require_once('./role/origin.php');
require_once('./role/player.php');
require_once('./role/enemy.php');
require_once('./role/monk.php');
require_once('./role/fighter.php');
require_once('./role/wizard.php');
require_once('./attacks.php');

$player_hp = $_POST['player'];
$fighter_hp = $_POST['fighter'];
$wizard_hp = $_POST['wizard'];
$monk_hp = $_POST['monk'];

$allies = [];

if ($player_hp > 0) {
    $player = new Player('勇者', $player_hp);
    $allies[] = $player;
}
if ($fighter_hp > 0) {
    $fighter = new Fighter($fighter_hp);
    $allies[] = $fighter;
}
if ($monk_hp > 0) {
    $monk = new Monk($monk_hp);
    $allies[] = $monk;
}
if ($wizard_hp > 0) {
    
    $wizard = new Wizard($wizard_hp);
    $allies[] = $wizard;
}


$enemy1 = new Enemy('ゴブリンA');
$enemy2 = new Enemy('ゴブリンB');
$enemy3 = new Enemy('ゴブリンC');
$enemies = [$enemy1, $enemy2,$enemy3];



$turn = 0;
$attackObj = new Attacks();

while (count($allies) > 0 && count($enemies) > 0) {
    
    echo '<p class="attack-start">勇者チームの攻撃!</p>';
    $enemies = $attackObj->attack($allies, $enemies);
    //配列が０なら終了
    if (count($enemies) === 0) {
        echo "\n";
        echo '<p class="win">勇者チームの勝ち</p>';
        break;
    }
    
    echo "\n";
    echo "\n";
    echo '<p class="attack-start">敵側の攻撃!</p>';
    $allies = $attackObj->attack($enemies, $allies);
    
    if (count($allies) === 0) {
        echo "\n";
        echo '<p class="win">敵チームの勝ち</p>';
        break;
    }
    echo "\n";
    echo "\n";
}

echo '@';

//postで0以上ならその値を取得
if ($player_hp > 0) {
    
    $player_hp = $player->getHp();
}
if ($fighter_hp > 0) {
    
    $fighter_hp = $fighter->getHp();
}
if ($monk_hp > 0) {
    
    $monk_hp = $monk->getHp();
}
if ($wizard_hp > 0) {
    
    $wizard_hp = $wizard->getHp();
}


//元が0の時どうすうるか
$value_array = [$player_hp, $fighter_hp, $monk_hp, $wizard_hp];
$jsonstr =  json_encode($value_array,  JSON_UNESCAPED_UNICODE);
echo $jsonstr;
