"use strict"
const texts = document.getElementsByClassName('texts')[0];
const text = document.getElementById('text');
const canvas = document.getElementById( 'canvas' );
//縦横をそれぞれ20等分するため
//デフォルト横300px、縦150px
//cssでの指定は注意
canvas.width = 640;
canvas.height = 640;
//canvas 要素のコンテキストオブジェクトを取得
const ctx = canvas.getContext( '2d' );

//キャラの設定
let chara = new Object();
//imageコンストラクタ
chara.img = new Image();
chara.img.src = './image/king.gif';
chara.x = 0;
chara.y = 0;
chara.move = 0;

//壁と通路のパネル
const block = new Image();
block.src = './image/block.png';
const road = new Image();
road.src = './image/road.png';
//敵表示
const enemy = new Image();
enemy.src = './image/devil.gif';
//ゴール
const goal = new Image();
goal.src = './image/goal.jpg';

//押されたキーがtrueになる
let key = new Object();
key.up = false;
key.down = false;
key.right = false;
key.left = false;
key.push = '';

const reload =document.getElementById('reload');
const reset =document.getElementById('reset');

//マップ
const map = [
	[0, 1, 1, 0, 1, 0, 0, 0 ,2 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2],
	[0, 1, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0],
	[0, 2, 1, 1, 0, 0, 0, 1 ,0 ,0 ,2 ,1 ,0 ,0 ,0 ,1 ,2 ,0 ,0 ,0],
	[1, 0, 1, 2, 1, 1, 2, 0 ,0 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ,0 ,1 ,0],
	[0, 0, 0, 0, 0, 1, 1, 1 ,0 ,1 ,2 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1 ,0],
	[0, 1, 1, 1, 0, 0, 0, 0 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
	[0, 1, 1, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,0],
	[2, 0, 0, 1, 0, 0, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,2],
	[1, 1, 0, 1, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,2 ,0 ,1 ,1 ,1 ,0 ,1 ,1],
	[1, 2, 0, 0, 0, 2, 1, 1 ,0 ,0 ,0 ,2 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,0],
	[1, 0, 1, 1, 1, 0, 0, 0 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,0],
	[1, 0, 1, 0, 1, 1, 1, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,0 ,1],
	[0, 0, 1, 0, 2, 1, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,2 ,1 ,1 ,1 ,2 ,0],
	[0, 1, 1, 1, 0, 1, 0, 1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,0],
	[0, 0, 0, 1, 0, 1, 0, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0],
	[1, 1, 0, 1, 0, 1, 0, 1 ,1 ,2 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0],
	[0, 0, 0, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,2 ,1 ,0],
	[0, 1, 1, 1, 0, 1, 2, 0 ,0 ,0 ,0 ,1 ,2 ,0 ,0 ,1 ,1 ,0 ,1 ,1],
	[0, 1, 0, 0, 0, 1, 0, 1 ,1 ,1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
	[0, 0, 0, 1, 2, 0, 0, 1 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,3]
];

// drawImage( image, sx, sy, sw, sh, dx, dy, dw, dh )
// sx, syで、画像を読み込む部分の、左上の位置(imageに対して)
// sw, shで、画像を読み込む部分の、幅と高さ(imageに対して)
// dx, dyで、画像を表示する、左上の位置(描画する場所)
// dw, dhで、画像を表示するときの大きさ(imageのサイズ)

function draw() {
	
	
	//塗りつぶす色を指定
	ctx.fillStyle = "rgb( 0, 0, 0 )";
	//塗りつぶす
	ctx.fillRect(0, 0, 640, 640);
    
	//mapのオブジェクト1/20を選択
	//その要素内の1/20を選択
	///1/400の最小ブロック
	//それが0なら通路、１なら壁を描画
    
    //mapの要素分繰り返す
    for (let y=0; y<map.length; y++) {
        
		//mapの要素のオブジェクト内の要素分繰り返す
		for (let x=0; x<map[y].length; x++) {
			//どこに(32*x縦と32*y横)
			if ( map[y][x] === 0 ) ctx.drawImage( road, 0, 0, 32, 32, 32*x, 32*y, 32, 32 );
			if ( map[y][x] === 1 ) ctx.drawImage( block, 0, 0, 100, 100, 32*x, 32*y, 32, 32 );
			if ( map[y][x] === 2 ) ctx.drawImage( enemy, 0, 0, 32, 32, 32*x, 32*y, 32, 32 );
			if ( map[y][x] === 3 ) ctx.drawImage( goal, 0, 0, 32, 32, 32*x, 32*y, 32, 32 );
            
		}
	}
    
	//キャラの描画
    ctx.drawImage( chara.img, chara.x, chara.y );
    
	//イベント矢印キーで動かすためのもの
	//押されてる間はその方向がtrueに、離すとfalse
    
    addEventListener("keydown", keydownfunc, false);
    addEventListener("keyup", keyupfunc, false);
    
	//方向キーが押されている場合は
	//キャラが移動する
    
	if ( chara.move === 0 ) {
		//押されているキーの方向
		if ( key.left === true ) {
			//両方とも整数値→パネルの位置を正しく指定
			let x = chara.x/32;
			let y = chara.y/32;
			//一つ前のパネル＝当たる前のパネル
			x--;
			//0、つまり通路なら一つ分のパネルに進んだことに
			if ( map[y][x] === 0 ) {
				chara.move = 32;
				key.push = 'left';
			} else if (map[y][x] === 2) {
                battle();
				map[y][x] = 0;
				ctx.drawImage( road, 0, 0, 32, 32, 32*x, 32*y, 32, 32 );
            }
		}
		if ( key.up === true ) {
			let x = chara.x/32;
			let y = chara.y/32;
			//マップ上にいかないための制御
			if ( y > 0) {
				y--;
				if ( map[y][x] === 0 ) {
					chara.move = 32;
					key.push = 'up';
				} else if (map[y][x] === 2) {
                    battle();
                    map[y][x] = 0;
                    ctx.drawImage( road, 0, 0, 32, 32, 32*x, 32*y, 32, 32 );
                }
			}
		}
		if ( key.right === true ) {
			let x = chara.x/32;
			let y = chara.y/32;
			x++;
			if ( map[y][x] === 0 ) {
				chara.move = 32;
				key.push = 'right';
			} else if (map[y][x] === 2) {
				
                battle();
				map[y][x] = 0;
				ctx.drawImage( road, 0, 0, 32, 32, 32*x, 32*y, 32, 32 );
			}
		}
		if ( key.down === true ) {
			let x = chara.x/32;
			let y = chara.y/32;
			if ( y < 19 ) {
				y++;
				if ( map[y][x] === 0 ) {
					chara.move = 32;
					key.push = 'down';
				} else if (map[y][x] === 2) {
                    battle();
                    map[y][x] = 0;
                    ctx.drawImage( road, 0, 0, 32, 32, 32*x, 32*y, 32, 32 );
                } else if (map[y][x] === 3) {
                    chara.move = 32;
					key.push = 'down';
                    text.textContent = 'クリア！';
                    text.style.color = 'red';
                    text.style.fontSize = '50px';
					life = false;
					reset.style.display = 'inline';
                }
			}
		}
	}
	
	//chara.moveが0より大きい場合は、4pxずつ移動を続ける
	if (chara.move > 0) {
		
		chara.move -= 4;
		if ( key.push === 'left' ) chara.x -= 4;
		if ( key.push === 'up' ) chara.y -= 4;
		if ( key.push === 'right' ) chara.x += 4;
		if ( key.push === 'down' ) chara.y += 4;
	}
    
    requestAnimationFrame( draw );
}

//画像の描画
addEventListener('load', draw(), false);

let life = true;

// ←	37
// ↑	38
// →	39
// ↓	40
//押されたときに呼び出される
//押した方向キーに応じてtureに
function keydownfunc( event ) {
    
    if (life) {
        let key_code = event.keyCode;
        if( key_code === 37 ) key.left = true;
        if( key_code === 38 ) key.up = true;
        if( key_code === 39 ) key.right = true;
        if( key_code === 40 ) key.down = true;
        event.preventDefault();
    }
}

//放されたときに呼び出される
//falseに戻す
function keyupfunc( event ) {
	let key_code = event.keyCode;
	if( key_code === 37 ) key.left = false;
	if( key_code === 38 ) key.up = false;
	if( key_code === 39 ) key.right = false;
	if( key_code === 40 ) key.down = false;
}


const pHp = document.getElementById('p-hp');
const fHp = document.getElementById('f-hp');
const wHp = document.getElementById('w-hp');
const mHp= document.getElementById('m-hp');

const hps = [pHp, fHp, wHp, mHp];

function battle() {
    const player = document.getElementById('player');
    const fighter = document.getElementById('fighter');
    const wizard = document.getElementById('wizard');
    const monk = document.getElementById('monk');
    
	const allies = [player, fighter, wizard, monk];
	
    const data = new FormData;
    
    data.append('player', player.textContent);
    data.append('fighter', fighter.textContent);
    data.append('wizard', wizard.textContent);
    data.append('monk', monk.textContent);
    
    
    fetch("process/text.php", {
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
            text.style.color = 'black';
            text.style.fontSize = '16px';
            text.innerHTML = newText;
            
            
            //数値部分切り出し
            const newJson = data.slice(num + 1);
            //いらない文字を省き、それぞれ配列に変換
            let hppara = newJson.replace(/\[/g, '');
            hppara = hppara.replace(/\]/g, '');
            hppara = hppara.replace(/\"/g, '');
            hppara = hppara.split(',');
            
            //mapとparseFloatですべて数値に
            hppara = hppara.map(elem => parseFloat(elem));
            
			
			for (let i = 0; i < 4; i++) {
				
				if (hppara[i] === 0) {
					allies[i].style.color = 'red';
					hps[i].style.color = 'red';
				}
				allies[i].textContent = hppara[i];
			}
            
            
            //数値化後、足す
            let total = hppara.reduce(function(sum, element){
                return sum + element;
            }, 0);
            
			//負けた時
            if (total === 0) {
                
                const over = document.getElementById('over');
                over.textContent = 'ゲームオーバー';
                life = false;
                reload.style.display = 'inline';
				texts.style.color = 'red';
				text.style.color = 'red';
            }
            
        })
}

reload.addEventListener('click',function(){
  window.location.reload();
});
reset.addEventListener('click',function(){
  window.location.reload();
});