import * as PIXI from 'pixi.js';

export const VECTOR={
    DOWN:0,
    LEFT:1,
    RIGHT:2,
    UP:3,
    BROKEN:4
}

export class Object{

    _x = 0;
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    _y = 0;
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    TILE;
    _passable=false;
    _moveable=false;
    _transparent=false;
    objSprites=[];
    _vector=VECTOR.DOWN;
    

/**
 * 
 * @param {*} TILE
 * @param {*} x 
 * @param {*} y 
 * @param {PIXI.Texture} downTexture 
 * @param {PIXI.Texture} leftTexture (default:downTexture)
 * @param {PIXI.Texture} rightTexture (default:downTexture)
 * @param {PIXI.Texture} upTexture (default:downTexture)
 */
    constructor(TILE,x,y,vector,downTexture,leftTexture=downTexture,rightTexture=downTexture,upTexture=downTexture,brokenTexture=downTexture){
        this.TILE=TILE;0
        this.x=x;
        this.y=y;

        this._transparent=false;
        this._moveable=false;
        this._passable=false;
        this._vector=vector;

        this.objSprites[VECTOR.DOWN]= new PIXI.Sprite(downTexture);
        this.objSprites[VECTOR.DOWN].visible=false;
        this.objSprites[VECTOR.DOWN].x=y*TILE.X;
        this.objSprites[VECTOR.DOWN].y=x*TILE.Y;
        this.objSprites[VECTOR.LEFT]= new PIXI.Sprite(leftTexture);
        this.objSprites[VECTOR.LEFT].visible=false;
        this.objSprites[VECTOR.LEFT].x=y*TILE.X;
        this.objSprites[VECTOR.LEFT].y=x*TILE.Y;
        this.objSprites[VECTOR.RIGHT]= new PIXI.Sprite(rightTexture);
        this.objSprites[VECTOR.RIGHT].visible=false;
        this.objSprites[VECTOR.RIGHT].x=y*TILE.X;
        this.objSprites[VECTOR.RIGHT].y=x*TILE.Y;
        this.objSprites[VECTOR.UP]= new PIXI.Sprite(upTexture);
        this.objSprites[VECTOR.UP].visible=false;
        this.objSprites[VECTOR.UP].x=y*TILE.X;
        this.objSprites[VECTOR.UP].y=x*TILE.Y;
        this.objSprites[VECTOR.BROKEN]= new PIXI.Sprite(upTexture);
        this.objSprites[VECTOR.BROKEN].visible=false;
        this.objSprites[VECTOR.BROKEN].x=y*TILE.X;
        this.objSprites[VECTOR.BROKEN].y=x*TILE.Y;
    }

    /**
     * 継承して使うようのトリガー処理
     * @param {*} player 
     * @param {*} objectMap 
     */
    checkTrigger(player,objectMap){
    }

    getSprites(){
        return this.objSprites;
    }

    get passable(){
        return this._passable;
    }
    get moveable(){
        return this._moveable;
    }
    get transparent(){
        return this._transparent;
    }
    get vector(){
        return this._vector;
    }

    /**
     * @param {boolean} visible
     * オブジェクトの表示非表示を設定
     * transparentがtrueのときは強制的に非表示
     */
    set visible(visible){
        // 全部非表示にして
        for(let i=0;i<4;i++){
            this.objSprites[i].visible=false;
        }
        // 透明じゃないなら設定する
        if(this.transparent==false){
            this.objSprites[this.vector].visible=visible;
        }
    }
    /**
     * @param {boolean} passable
     * 視線が通るかどうかの設定
     */
    set passable(passable){
        this._passable=passable;
    }
    /**
     * @param {boolean} transparent
     * オブジェクトが透明かどうかの設定
     */
    set transparent(transparent){
        this._transparent=transparent;
    }
    /**
     * @param {boolean} moveable
     * オブジェクトを通り抜けれるかどうかの設定
     */
    set moveable(moveable){
        this._moveable=moveable;
    }

    
    /**
     * @param {VECTOR} vector
     */
    set vector(vector){
        this._vector=vector;
    }

}