import * as PIXI from 'pixi.js';
import * as PLAYER from './player.js';
import * as OBJECT from './objects.js';


const tile1 = PIXI.Texture.from('./res/tile1.png');
const TILE={
    X:32,
    Y:32
};
const MAPSIZE={
    X:10,
    Y:20
}

const player1 = new PLAYER.Player(TILE,MAPSIZE);
const objectManager = new OBJECT.ObjectManager(TILE,MAPSIZE);

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
    dungeonScene.addChild(objectManager.getObjects);
    dungeonScene.addChild(player1.getPlayer);
    objectManager.setVision(player1.getX,player1.getY,player1.vision);
    dungeonScene.addChild(player1.getStatus);

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
    buttonLeft.x = dungeonMap[0].length /2 * TILE.X- (TILE.X*1.7);
    buttonLeft.y = dungeonMap.length * TILE.Y + TILE.Y/2;
    buttonLeft
    .on('click', moveLeft)
    .on('touchstart', moveLeft);
    buttonLeft.interactive = true;
    dungeonScene.addChild(buttonLeft);

    const buttonRight = new PIXI.Text('→');
    buttonRight.x = dungeonMap[0].length /2 * TILE.X + (TILE.X *0.25);
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
    let moved=false;
    if(key=='ArrowRight'){
        player1.vector = PLAYER.VECTOR.RIGHT;
        if(objectManager.checkMoveable(player1.getX,player1.getY+1)){
            if(player1.getY < dungeonMap[player1.getX].length - 1){
                player1.setY = player1.getY+1;
                moved=true;
            }
        }
    }
    if(key=='ArrowUp'){
        player1.vector = PLAYER.VECTOR.UP;
        if(objectManager.checkMoveable(player1.getX-1,player1.getY)){
            if(player1.getX > 0 ){
                player1.setX = player1.getX-1;
                moved=true;
            }
        }
    }
    if(key=='ArrowDown'){
        player1.vector = PLAYER.VECTOR.DOWN;
        if(objectManager.checkMoveable(player1.getX+1,player1.getY)){
            if(player1.getX < dungeonMap.length - 1){
                player1.setX = player1.getX+1;
                moved=true;
            }
        }
    }
    if(key=='ArrowLeft'){
        player1.vector = PLAYER.VECTOR.LEFT;
        if(objectManager.checkMoveable(player1.getX,player1.getY-1)){
            if(player1.getY > 0 ){
                player1.setY = player1.getY-1;
                moved=true;
            }
        }
    }

    // 視界のアップデート
    objectManager.setVision(player1.getX,player1.getY,player1.getVision);

    // 移動後の処理
    if(moved==true){
        player1.sp = player1.sp-1;
        objectManager.checkTriggers(player1);
    }
}

