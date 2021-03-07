<?php

class Monk extends origin
{
    private $name = '僧侶';
    private $hp ;
    private $attack = 30;
    
    public function __construct($hp)
    {
        parent::__construct($this->name, $hp, $this->attack);
    }
    
}