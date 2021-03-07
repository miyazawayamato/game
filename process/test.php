<?php

require_once('./role/origin.php');
require_once('./role/player.php');
require_once('./role/enemy.php');
require_once('./role/monk.php');
require_once('./role/fighter.php');
require_once('./role/wizard.php');
require_once('./attacks.php');

$player_hp = 400;
$fighter_hp = 500;
$wizard_hp = 600;
$monk_hp = 700;

$player = new Player('主人公', $player_hp);
$fighter = new Fighter($fighter_hp);
$monk = new Monk($monk_hp);
$wizard = new Wizard($wizard_hp);

$allies = [$player, $fighter, $monk, $wizard];

$enemy1 = new Enemy('敵1');
$enemy2 = new Enemy('敵2');
$enemy3 = new Enemy('敵3');
$enemies = [$enemy1, $enemy2,$enemy3];



$turn = 0;
$attackObj = new Attacks();



while (count($allies) > 0 && count($enemies) > 0) {
    
    echo "\n";
    echo '勇者チームの攻撃!';
    echo "\n";
    $enemies = $attackObj->attack($allies, $enemies);
    //配列が０なら終了
    if (count($enemies) === 0) {
        echo "\n";
        echo '勇者チームの勝ち';
        break;
    }
    
    echo "\n";
    echo '敵側の攻撃!';
    echo "\n";
    $allies = $attackObj->attack($enemies, $allies);
    
    if (count($allies) === 0) {
        echo "\n";
        echo '敵チームの勝ち';
        break;
    }
    
    
}
echo "\n";
echo 'バトル終了';

//hp取得して書き換え
//改行が利用できる？
//味方が死んだときの処理
//負けた場合の処理