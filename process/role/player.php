<?php

class Player extends origin
{
    private $name;
    private $hp;
    private $attack = 30;
    
    public function __construct($name, $hp)
    {
        parent::__construct($name, $hp, $this->attack);
    }
}