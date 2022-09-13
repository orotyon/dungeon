import * as PIXI from 'pixi.js';
import { TilingSprite } from 'pixi.js';

export const VECTOR={
    DOWN:0,
    LEFT:1,
    RIGHT:2,
    UP:3
}
const STATUS_TYPE={
    HP:0,
    MHP:1,
    SP:2,
    MSP:3
}
export class Player{
    x=0;
    y=0;
    _hp=100;
    get hp(){
        return this._hp;
    }
    set hp(hp){
        this._hp=hp;
        this.elmPlayerTexts[STATUS_TYPE.HP].text=hp;
    }
    _sp=100;
    get sp(){
        return this._sp;
    }
    set sp(sp){
        this._sp=sp;
        this.elmPlayerTexts[STATUS_TYPE.SP].text=sp;
    }
    mhp=100;
    msp=100;
    vision=4;
    TILE;
    MAPSIZE;
    elmPlayer = new PIXI.Container();
    elmAnimPlayer = [];
    elmPlayerStatus = new PIXI.Container();
    elmPlayerTexts = [];
    
    constructor(TILE,MAPSIZE){
        this.MAPSIZE=MAPSIZE;
        this.TILE=TILE;
        this.hito01 = PIXI.Texture.from('./res/hito/hito01.png')
        this.hito02 = PIXI.Texture.from('./res/hito/hito02.png')
        this.hito03 = PIXI.Texture.from('./res/hito/hito03.png')
        this.hito11 = PIXI.Texture.from('./res/hito/hito11.png')
        this.hito12 = PIXI.Texture.from('./res/hito/hito12.png')
        this.hito13 = PIXI.Texture.from('./res/hito/hito13.png')
        this.hito21 = PIXI.Texture.from('./res/hito/hito21.png')
        this.hito22 = PIXI.Texture.from('./res/hito/hito22.png')
        this.hito23 = PIXI.Texture.from('./res/hito/hito23.png')
        this.hito31 = PIXI.Texture.from('./res/hito/hito31.png')
        this.hito32 = PIXI.Texture.from('./res/hito/hito32.png')
        this.hito33 = PIXI.Texture.from('./res/hito/hito33.png')

        const down = [];
        down.push(this.hito01);
        down.push(this.hito02);
        down.push(this.hito03);
        down.push(this.hito02);
        this.elmAnimPlayer[VECTOR.DOWN]=new PIXI.AnimatedSprite(down);
        this.elmAnimPlayer[VECTOR.DOWN].x = this.x;
        this.elmAnimPlayer[VECTOR.DOWN].y = this.y;
        this.elmAnimPlayer[VECTOR.DOWN].animationSpeed = 0.05;
        this.elmAnimPlayer[VECTOR.DOWN].play();
        this.elmPlayer.addChild(this.elmAnimPlayer[VECTOR.DOWN]);

        const left = [];
        left.push(this.hito11);
        left.push(this.hito12);
        left.push(this.hito13);
        left.push(this.hito12);
        this.elmAnimPlayer[VECTOR.LEFT]=new PIXI.AnimatedSprite(left);
        this.elmAnimPlayer[VECTOR.LEFT].x = this.x;
        this.elmAnimPlayer[VECTOR.LEFT].y = this.y;
        this.elmAnimPlayer[VECTOR.LEFT].animationSpeed = 0.05;
        this.elmAnimPlayer[VECTOR.LEFT].play();
        this.elmPlayer.addChild(this.elmAnimPlayer[VECTOR.LEFT]);

        const right = [];
        right.push(this.hito21);
        right.push(this.hito22);
        right.push(this.hito23);
        right.push(this.hito22);
        this.elmAnimPlayer[VECTOR.RIGHT]=new PIXI.AnimatedSprite(right);
        this.elmAnimPlayer[VECTOR.RIGHT].x = this.x;
        this.elmAnimPlayer[VECTOR.RIGHT].y = this.y;
        this.elmAnimPlayer[VECTOR.RIGHT].animationSpeed = 0.05;
        this.elmAnimPlayer[VECTOR.RIGHT].play();
        this.elmPlayer.addChild(this.elmAnimPlayer[VECTOR.RIGHT]);

        const up = [];
        up.push(this.hito31);
        up.push(this.hito32);
        up.push(this.hito33);
        up.push(this.hito32);
        this.elmAnimPlayer[VECTOR.UP]=new PIXI.AnimatedSprite(up);
        this.elmAnimPlayer[VECTOR.UP].x = this.x;
        this.elmAnimPlayer[VECTOR.UP].y = this.y;
        this.elmAnimPlayer[VECTOR.UP].animationSpeed = 0.05;
        this.elmAnimPlayer[VECTOR.UP].play();
        this.elmPlayer.addChild(this.elmAnimPlayer[VECTOR.UP]);

        // ステータス
        const hpText    = new PIXI.Text('HP       /');
        const nowhpText = new PIXI.Text(this.hp);
        const mhpText   = new PIXI.Text(this.mhp);
        const spText    = new PIXI.Text('SP       /');
        const nowspText = new PIXI.Text(this.sp);
        const mspText   = new PIXI.Text(this.msp);
        hpText.x = 20;
        hpText.y = TILE.X*MAPSIZE.X+10;
        nowhpText.x = 60;
        nowhpText.y = TILE.X*MAPSIZE.X+10;
        mhpText.x = 120;
        mhpText.y = TILE.X*MAPSIZE.X+10;
        spText.x = 20;
        spText.y = TILE.X*MAPSIZE.X+40;
        
        nowspText.x = 60;
        nowspText.y = TILE.X*MAPSIZE.X+40;
        mspText.x = 120;
        mspText.y = TILE.X*MAPSIZE.X+40;
        this.elmPlayerStatus.addChild(hpText);
        this.elmPlayerStatus.addChild(nowhpText);
        this.elmPlayerStatus.addChild(mhpText);
        this.elmPlayerStatus.addChild(spText);
        this.elmPlayerStatus.addChild(nowspText);
        this.elmPlayerStatus.addChild(mspText);
        this.elmPlayerTexts[STATUS_TYPE.HP]=nowhpText;
        this.elmPlayerTexts[STATUS_TYPE.MHP]=mhpText;
        this.elmPlayerTexts[STATUS_TYPE.SP]=nowspText;
        this.elmPlayerTexts[STATUS_TYPE.MSP]=mspText;
    
        

        }

    get getPlayer(){
        return this.elmPlayer;
    }
    get getStatus(){
        return this.elmPlayerStatus;
    }

    get getX(){
        return this.x;
    }
    set setX(x){
        this.x=x;
        for(let i=0;i<4;i++){
            this.elmAnimPlayer[i].y=x*this.TILE.X;
        }
    }
    get getY(){
        return this.y;
    }
    set setY(y){
        this.y=y
        for(let i=0;i<4;i++){
            this.elmAnimPlayer[i].x = y * this.TILE.Y;
        }
    }
    get getVision(){
        return this.vision;
    }

    set vector(vector){
        for(let i=0;i<4;i++){
            this.elmAnimPlayer[i].visible=false;
        }
        this.elmAnimPlayer[vector].visible=true;
    }

}