const battle = function () {
    const player = document.getElementById('player');
    const fighter = document.getElementById('fighter');
    const wizard = document.getElementById('wizard');
    const monk = document.getElementById('monk');
    const text = document.getElementById('text');
    
    const data = new FormData;
    
    data.append('player', player.textContent);
    data.append('fighter', fighter.textContent);
    data.append('wizard', wizard.textContent);
    data.append('monk', monk.textContent);
    
    
    fetch("process/test.php", {
        method: "POST",
        body: data
    }
        )
        .then((res) => {
            
            return res.text();
        })
        
        .then((data) => {
            
            //@が何番目にあるか
            const num = data.indexOf('@');
            //初期位置から@番目を切り出す(戦闘文)
            const newText = data.slice(0, num);
            text.textContent = newText;
            //ターンごとに分割
            // const turn = newText.split('|');
            
            // for (let i = 0; i < turn.length; i++) {
                
            //     write(i);
                
            // }
            
            // function write (index) { 
                
            //     text.textContent = turn[index];
            // }
            
            
            //数値部分切り出し
            const newJson = data.slice(num + 1);
            //いらない文字を省き、それぞれ配列に変換
            let hppara = newJson.replace(/\[/g, '');
            hppara = hppara.replace(/\]/g, '');
            hppara = hppara.replace(/\"/g, '');
            hppara = hppara.split(',');
            
            //mapとparseFloatですべて数値に
            hppara = hppara.map(elem => parseFloat(elem));
            
            player.textContent = hppara[0];
            fighter.textContent = hppara[1];
            wizard.textContent = hppara[2];
            monk.textContent = hppara[3];
            
            
            //数値化後、足す
            let total = hppara.reduce(function(sum, element){
                return sum + element;
            }, 0);
            
            if (total === 0) {
                
                alert('GAME　OVER');
            }
            
        })
}

export default battle;