import * as PIXI from 'pixi.js';

const tile1 = PIXI.Texture.from('./res/tile1.png');
const TILE={
    X:32,
    Y:32
};
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
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
    const basicText = new PIXI.Text('てきとーげーむ２');
    basicText.x = 50;
    basicText.y = 50;
    dungeonScene.addChild(basicText);

    for(let i=0;i<dungeonMap.length;i++){
        for(let j=0;j<dungeonMap[i].length;j++){
            const tile = new PIXI.Sprite(tile1);
            tile.x=i*TILE.X;
            tile.y=j*TILE.Y;
            dungeonScene.addChild(tile);
        }
    }

    const textureArray = [];
    textureArray.push(PIXI.Texture.from('./res/hito/hito01.png'));
    textureArray.push(PIXI.Texture.from('./res/hito/hito02.png'));
    textureArray.push(PIXI.Texture.from('./res/hito/hito03.png'));
    textureArray.push(PIXI.Texture.from('./res/hito/hito02.png'));

    const hito = new PIXI.AnimatedSprite(textureArray);
    hito.animationSpeed = 0.1;
    hito.x = 0;
    hito.y = 0;
    hito.play();
    dungeonScene.addChild(hito);

    return dungeonScene;
}
