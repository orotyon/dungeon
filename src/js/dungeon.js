import * as PIXI from 'pixi.js';
import * as PLAYER from './player.js';
import * as OBJECT from './objects.js';
import * as BUTTON from './gameInterface/button.js';


const tile1 = PIXI.Texture.from('./res/tile1.png');
const arrowUpOn = PIXI.Texture.from('./res/cursor/cursor_up_on.png');
const arrowUpOff = PIXI.Texture.from('./res/cursor/cursor_up_off.png');
const arrowLeftOn = PIXI.Texture.from('./res/cursor/cursor_left_on.png');
const arrowLeftOff = PIXI.Texture.from('./res/cursor/cursor_left_off.png');
const arrowRightOn = PIXI.Texture.from('./res/cursor/cursor_right_on.png');
const arrowRightOff = PIXI.Texture.from('./res/cursor/cursor_right_off.png');
const arrowDownOn = PIXI.Texture.from('./res/cursor/cursor_down_on.png');
const arrowDownOff = PIXI.Texture.from('./res/cursor/cursor_down_off.png');

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
const arrowUpButton = new BUTTON.Button(500,325,arrowUpOn,arrowUpOff)
const arrowLeftButton = new BUTTON.Button(465,345,arrowLeftOn,arrowLeftOff)
const arrowRightButton = new BUTTON.Button(535,345,arrowRightOn,arrowRightOff)
const arrowDownButton = new BUTTON.Button(500,365,arrowDownOn,arrowDownOff)

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

    //test
    arrowUpButton.buttonContainer.on('mousedown',moveUpPress);
    arrowUpButton.buttonContainer.on('touchstart',moveUpPress);
    arrowUpButton.buttonContainer.on('mouseup',moveUp);
    arrowUpButton.buttonContainer.on('touchend',moveUp);
    dungeonScene.addChild(arrowUpButton.getContainer());
    arrowRightButton.buttonContainer.on('mousedown',moveRightPress);
    arrowRightButton.buttonContainer.on('touchstart',moveRightPress);
    arrowRightButton.buttonContainer.on('mouseup',moveRight);
    arrowRightButton.buttonContainer.on('touchend',moveRight);
    dungeonScene.addChild(arrowRightButton.getContainer());
    arrowLeftButton.buttonContainer.on('mousedown',moveLeftPress);
    arrowLeftButton.buttonContainer.on('touchstart',moveLeftPress);
    arrowLeftButton.buttonContainer.on('mouseup',moveLeft);
    arrowLeftButton.buttonContainer.on('touchend',moveLeft);
    dungeonScene.addChild(arrowLeftButton.getContainer());
    arrowDownButton.buttonContainer.on('mousedown',moveDownPress);
    arrowDownButton.buttonContainer.on('touchstart',moveDownPress);
    arrowDownButton.buttonContainer.on('mouseup',moveDown);
    arrowDownButton.buttonContainer.on('touchend',moveDown);
    dungeonScene.addChild(arrowDownButton.getContainer());


    return dungeonScene;
}

// キー押上イベント
document.addEventListener('keydown', keydown_ivent);
function keydown_ivent(e) {
}
function moveUpPress(){
    arrowUpButton.objSprites[BUTTON.MODE.ON].visible=true;
    arrowUpButton.objSprites[BUTTON.MODE.OFF].visible=false;
}
function moveDownPress(){
    arrowDownButton.objSprites[BUTTON.MODE.ON].visible=true;
    arrowDownButton.objSprites[BUTTON.MODE.OFF].visible=false;
}

function moveRightPress(){
    arrowRightButton.objSprites[BUTTON.MODE.ON].visible=true;
    arrowRightButton.objSprites[BUTTON.MODE.OFF].visible=false;
}

function moveLeftPress(){
    arrowLeftButton.objSprites[BUTTON.MODE.ON].visible=true;
    arrowLeftButton.objSprites[BUTTON.MODE.OFF].visible=false;
}

// キー押下イベント
document.addEventListener('keyup', keyup_ivent);
function keyup_ivent(e) {
    move(e.key);
    return false; 
}
function moveDown(){
    arrowDownButton.objSprites[BUTTON.MODE.ON].visible=false;
    arrowDownButton.objSprites[BUTTON.MODE.OFF].visible=true;
    move('ArrowDown');
}
function moveLeft(){
    arrowLeftButton.objSprites[BUTTON.MODE.ON].visible=false;
    arrowLeftButton.objSprites[BUTTON.MODE.OFF].visible=true;
    move('ArrowLeft');
}
function moveRight(){
    arrowRightButton.objSprites[BUTTON.MODE.ON].visible=false;
    arrowRightButton.objSprites[BUTTON.MODE.OFF].visible=true;
    move('ArrowRight');
}
function moveUp(){
    arrowUpButton.objSprites[BUTTON.MODE.ON].visible=false;
    arrowUpButton.objSprites[BUTTON.MODE.OFF].visible=true;
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
        objectManager.overObjects(player1);
    }
}

