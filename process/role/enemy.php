<?php

class Enemy extends origin
{
    private $name;
    private $hp = 100;
    private $attack = 30;
    
    public function __construct($name)
    {
        parent::__construct($name, $this->hp, $this->attack);
    }
}