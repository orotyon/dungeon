import * as PIXI from 'pixi.js';

export const VECTOR={
    DOWN:0,
    LEFT:1,
    RIGHT:2,
    UP:3
}
export class Player{
    x=0;
    y=0;
    vision=4;
    TILE;
    elmPlayer = new PIXI.Container();
    elmAnimPlayer = [];
    
    constructor(TILE){
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

        // this.vector=VECTOR.DOWN;
        }

    get getPlayer(){
        return this.elmPlayer;
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