<?php
class Origin 
{
    private $name;
    private $hp;
    private $attack;
    
    public function __construct($name,$hp = 100, $attack = 100)
    {
        $this->name = $name;
        $this->hp = $hp;
        $this->attack = $attack;
    }
    
    public function getName() 
    {
        return $this->name;
    }
    
    public function getHp()
    {
        return $this->hp;
    }
    
    
    public function doAttack($enemy)
    {
        echo $this->getName().'が'.$enemy->getName().'に攻撃';
        echo $this->attack.'のダメージ';
        echo "\n";
        $enemy->tookDamage($this->attack);
    }
    
    public function tookDamage($damage)
    {
        $this->hp -= $damage;
        if ($this->hp < 0) {
            $this->hp = 0;
        }
    }
}