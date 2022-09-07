import * as PIXI from 'pixi.js';

export class Object{
    x=0;
    y=0;
    TILE;
    passable=false;
    obj1 = PIXI.Texture.from('./res/obj1.png');
    elmObject = new PIXI.Container();
    objectMap = [
        [0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,1,0],
        [0,0,0,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,0],
        [0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,1,1,0,1,0],
        [0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,0,0,0,0,0,0,0,1,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,1,0,0,0,0,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0]
    ];
    

    constructor(TILE){
        this.TILE=TILE;
        for(let i=0;i<this.objectMap.length;i++){
            for(let j=0;j<this.objectMap[i].length;j++){
                if(this.objectMap[i][j]==1){
                    const obj = new PIXI.Sprite(this.obj1);
                    obj.x=j*TILE.X;
                    obj.y=i*TILE.Y;
                    this.elmObject.addChild(obj);
                }
            }
        }
    }

    get getObjects(){
        return this.elmObject;
    }

    checkMoveable(x,y){
        let result=true;
        if(result==true && (x<0 || this.objectMap.length <= x)){
            result=false;
        }
        if(result==true){
            if(y<0 || this.objectMap[x].length<=y){
            result=false;
            }
        }
        if(result==true){
            if(this.objectMap[x][y]!=0){
                result=false;
            }
        } 

        return result;
    }



}