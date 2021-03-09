<?php

class Attacks
{
    
    public function attack($attackers, $receivers)
    {
        
        //攻撃する方の数
        $max = count($attackers);
        
        for ($i = 0; $i < $max; $i++) {
            
            
            
            // //配列が空になったらループ終了
            if (count($receivers) === 0) {
                
                break;
            }
            
            
            
            // //受ける側のインデックス
            $be = rand(0, count($receivers) -1);
            $attackers[$i]->doAttack($receivers[$be]);
            echo $receivers[$be]->getName().'の残りHPは'.$receivers[$be]->getHp();
            echo "\n";
            if ($receivers[$be]->getHp() === 0) {
                
                echo '<p class="deth">'.$receivers[$be]->getName().'死亡</p>';
                unset($receivers[$be]);
                $receivers = array_values($receivers);
            }
            
        }
        
        return $receivers;
        
    }
}