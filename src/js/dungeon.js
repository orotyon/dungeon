import * as PIXI from 'pixi.js';
import * as PLAYER from './player.js';


const tile1 = PIXI.Texture.from('./res/tile1.png');
const TILE={
    X:32,
    Y:32
};
const player1 = new PLAYER.Player(TILE);

const dungeonMap = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

/**
 * 
 * @returns PIXI.Container
 */
export function createDungeonScene(){
    const dungeonScene = new PIXI.Container();
    dungeonScene.visible=false;

    for(let i=0;i<dungeonMap.length;i++){
        for(let j=0;j<dungeonMap[i].length;j++){
            const tile = new PIXI.Sprite(tile1);
            tile.x=j*TILE.X;
            tile.y=i*TILE.Y;
            dungeonScene.addChild(tile);
        }
    }

    // プレイヤーの追加
    dungeonScene.addChild(player1.getPlayer);

    // 移動ボタンの追加
    const buttonUp = new PIXI.Text('↑');
    buttonUp.x = dungeonMap[0].length /2 * TILE.X - (TILE.X/2);
    buttonUp.y = dungeonMap.length * TILE.Y;
    buttonUp
    .on('click', moveUp)
    .on('touchstart', moveUp);
    buttonUp.interactive = true;
    dungeonScene.addChild(buttonUp);

    const buttonLeft = new PIXI.Text('←');
    buttonLeft.x = dungeonMap[0].length /2 * TILE.X- (TILE.X*1.5);
    buttonLeft.y = dungeonMap.length * TILE.Y + TILE.Y/2;
    buttonLeft
    .on('click', moveLeft)
    .on('touchstart', moveLeft);
    buttonLeft.interactive = true;
    dungeonScene.addChild(buttonLeft);

    const buttonRight = new PIXI.Text('→');
    buttonRight.x = dungeonMap[0].length /2 * TILE.X + (TILE.X *0.05);
    buttonRight.y = dungeonMap.length * TILE.Y + TILE.Y/2;
    buttonRight
    .on('click', moveRight)
    .on('touchstart', moveRight);
    buttonRight.interactive = true;
    dungeonScene.addChild(buttonRight);

    const buttonDown = new PIXI.Text('↓');
    buttonDown.x = dungeonMap[0].length /2 * TILE.X - (TILE.X/2);
    buttonDown.y = dungeonMap.length * TILE.Y+TILE.Y;
    buttonDown
    .on('click', moveDown)
    .on('touchstart', moveDown);
    buttonDown.interactive = true;
    dungeonScene.addChild(buttonDown);



    return dungeonScene;
}

// キーボードイベント
document.addEventListener('keyup', keyup_ivent);
function keyup_ivent(e) {
    move(e.key);
    return false; 
}
function moveDown(){
    move('ArrowDown');
}
function moveLeft(){
    move('ArrowLeft');
}
function moveRight(){
    move('ArrowRight');
}
function moveUp(){
    move('ArrowUp');
}
function move(key){
    if(key=='ArrowDown'){
        player1.vector = PLAYER.VECTOR.DOWN;
        if(player1.getY < dungeonMap.length - 1){
            player1.setY = player1.getY+1;
        }
    }
    if(key=='ArrowLeft'){
        player1.vector = PLAYER.VECTOR.LEFT;
        if(player1.getX > 0 ){
            player1.setX = player1.getX-1;
        }
    }
    if(key=='ArrowRight'){
        player1.vector = PLAYER.VECTOR.RIGHT;
        if(player1.getX < dungeonMap[0].length - 1){
            player1.setX = player1.getX+1;
        }
    }
    if(key=='ArrowUp'){
        player1.vector = PLAYER.VECTOR.UP;
        if(player1.getY > 0 ){
            player1.setY = player1.getY-1;
        }
    }
}