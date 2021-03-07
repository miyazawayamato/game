<?php

class Wizard extends origin
{
    private $name = '魔法使い';
    private $hp;
    private $attack = 10;
    
    public function __construct($hp)
    {
        parent::__construct($this->name, $hp, $this->attack);
    }
    public function doAttack($enemy)
    {
        $num = rand(1, 10);
        // 乱数の発生
        // スキルの発動
        echo $this->getName().'の魔法攻撃発動!';
        $magic = $this->attack * $num ;
        echo $enemy->getName().'に'.$magic.'のダメージ';
        echo "\n";
        $enemy->tookDamage($magic);
        
    }
}