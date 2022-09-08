import * as PIXI from 'pixi.js';

export class Object{
    x=0;
    y=0;
    TILE;
    passable=false;
    transparentable=false;
    objSprite;
    

    constructor(TILE,x,y){
        this.TILE=TILE;
        const objTexuture = PIXI.Texture.from('./res/obj1.png');
        this.objSprite= new PIXI.Sprite(objTexuture);
        this.objSprite.visible=false;
        this.objSprite.x=y*TILE.X;
        this.objSprite.y=x*TILE.Y;
    }

    get getSprite(){
        return this.objSprite;
    }

    /**
     * @param {boolean} visible
     */
    set visible(visible){
        this.objSprite.visible=visible;
    }

}