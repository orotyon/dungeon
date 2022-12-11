import * as PIXI from 'pixi.js';
import * as OBJECT from '../obj.js';

/**
 * 宝箱
 * 個別の処理が必要かは要検討・・・
 */
export class Tresure extends OBJECT.Object{
    _open;
    get open() {
        return this._open;
    }
    set open(value) {
        this._open = value;
    }

    constructor(TILE,x,y,vector,downTexture,leftTexture=downTexture,rightTexture=downTexture,upTexture=downTexture,brokenTexture=downTexture){
        super(TILE,x,y,vector,downTexture,leftTexture,rightTexture,upTexture,brokenTexture);
        this.open=false;
    }

    overObject(player){
        this.open=true;
        this.vector=OBJECT.VECTOR.BROKEN;
    }

}
