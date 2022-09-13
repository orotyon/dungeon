import * as PIXI from 'pixi.js';
import * as OBJ from './obj';

class Blind{
    TILE;
    blindAnim;
    constructor(TILE,x,y){
        this.TILE=TILE;
        const blindTexuture01 = PIXI.Texture.from('./res/blind/blind01.png');
        const blindTexuture02 = PIXI.Texture.from('./res/blind/blind02.png');

        const blindtmp = [];
        blindtmp.push(blindTexuture01);
        blindtmp.push(blindTexuture02);
        this.blindAnim=new PIXI.AnimatedSprite(blindtmp);
        this.blindAnim.x = y*TILE.X;
        this.blindAnim.y = x*TILE.Y;
        this.blindAnim.animationSpeed = 0.02;
        this.blindAnim.visible=true;
        this.blindAnim.alpha=0.60;
        this.blindAnim.play();
    }

    get getBlindAnim(){
        return this.blindAnim;
    }

    /**
     * @param {boolean} value
     */
    set visible(value){
        this.blindAnim.visible=value;
    }

}

export class BlindManager{
    MAPSIZE;
    TILE;
    blindList=[];
    bilndContainer = new PIXI.Container();

    constructor(TILE,blindMap){
        this.TILE=TILE;
        for(let i=0;i<blindMap.length;i++){
            let blindLine=[];
            for(let  j=0;j<blindMap[i].length;j++){
                const blindAnim=new Blind(TILE,i,j);
                blindLine.push(blindAnim);
                this.bilndContainer.addChild(blindAnim.getBlindAnim);
            }
            this.blindList.push(blindLine);
        }
    }

    get getBlindContainer(){
        return this.bilndContainer;
    }

    setBlindMap(blindMap){
        for(let i=0;i<blindMap.length;i++){
            for(let  j=0;j<blindMap[i].length;j++){
                this.blindList[i][j].visible=blindMap[i][j];
            }
        }
    }


}