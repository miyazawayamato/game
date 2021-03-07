<?php

class Fighter extends origin
{
    private $name = '格闘家';
    private $hp;
    private $attack = 50;
    
    public function __construct($hp)
    {
        parent::__construct($this->name, $hp, $this->attack);
    }
    
    public function doAttack($enemy)
    {
        // 乱数の発生
        if (rand(1, 4) === 1) {
            // スキルの発動
            echo $this->getName().'の強パンチが決まった!!';
            $punch = $this->attack * 3 ;
            echo $enemy->getName().'に'.$punch.'のダメージ';
            echo "\n";
            $enemy->tookDamage($punch);
        } else {
            parent::doAttack($enemy);
        }
    }
}