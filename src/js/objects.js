import * as PIXI from 'pixi.js';
import * as OBJ from './obj';
import * as BLIND from './blind.js';

export class ObjectManager{
    TILE;
    MAPSIZE;
    passable=false;
    transparentable=false;
    elmObject = new PIXI.Container();
    blindManager;
    objectTest = [
        [0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0]
    ];
    blindMap=[];
    viewMap=[];
    objectMap=[];
    

    constructor(TILE,MAPSIZE){
        this.MAPSIZE=MAPSIZE;
        this.TILE=TILE;

        // とりあえずテスト用にobjectTestからオブジェクトを配置
        for(let i=0;i<this.objectTest.length;i++){
            let objectLine=[];
            for(let j=0;j<this.objectTest[i].length;j++){
                if(this.objectTest[i][j]==1){
                    const obj = new OBJ.Object(TILE,i,j);
                    objectLine.push(obj);
                    this.elmObject.addChild(obj.getSprite);
                }
                else {
                    objectLine.push(null);
                }
            }
            this.objectMap.push(objectLine);
        }

        // ブラインド、視界の初期値生成
        for(let i=0;i<this.MAPSIZE.X;i++){
            let line=[];
            for(let j=0;j<this.MAPSIZE.Y;j++){
                line.push(true);
            }
            this.blindMap.push(line);
            this.viewMap.push(line);
        }

        this.blindManager = new BLIND.BlindManager(TILE,this.blindMap);
        this.elmObject.addChild(this.blindManager.getBlindContainer);
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
            if(this.objectMap[x][y]!=null){
                result=false;
            }
        } 

        return result;
    }


    clearMap(){
        for(let i=0;i<this.MAPSIZE.X;i++){
            for(let j=0;j<this.MAPSIZE.Y;j++){
                this.blindMap[i][j]=true;
                if(this.objectMap[i][j]!=null)this.objectMap[i][j].visible=false;
            }
        }
    }

    /**
     * 視界の計算
     * @param {int} 中心座標 X
     * @param {int} 中心座標 Y
     * @param {int} 視界の範囲 
     */
    setVision(x,y,vision){
        const map=[];
        for(let i=0;i<this.MAPSIZE.X;i++){
            const line=[]
            for(let j=0;j<this.MAPSIZE.Y;j++){
                line.push(-1);
            }
            map.push(line);
        }

        // あかりの確保
        this.clearMap();
        // this.recursionVision(8,18,2,map);
        this.recursionVision(x,y,vision,map);

        // あかりのある所に視線の確保
        for(let i=0;i<this.MAPSIZE.X;i++){
            for(let j=0;j<this.MAPSIZE.Y;j++){
                if(y<j){
                    if(map[i][j]>-1){
                        const disX=j-y;
                        const disY=i-x;
                        const tilt=disY/disX;
                        for(let k=y;k<j;k++){
                            if(this.objectMap[x+Math.floor((k-y)*tilt)][k]!=null){
                                map[i][j]=-1;
                            }
                            if(this.objectMap[x+Math.ceil((k-y)*tilt)][k]!=null){
                                map[i][j]=-1;
                            }
                        }
                    }
                }
                if(y>j){
                    if(map[i][j]>0){
                        const disX=y-j;
                        const disY=i-x;
                        const tilt=disY/disX;
                        for(let k=y;k>j;k--){
                            if(this.objectMap[x+Math.floor((y-k)*tilt)][k]!=null){
                                map[i][j]=-1;
                            }
                            if(this.objectMap[x+Math.ceil((y-k)*tilt)][k]!=null){
                                map[i][j]=-1;
                            }
                        }
                    }
                }
                if(x<i){
                    if(map[i][j]>0){
                        const disX=j-y;
                        const disY=i-x;
                        const tilt=disX/disY;
                        for(let k=x;k<i;k++){
                            if(this.objectMap[k][y+Math.floor((k-x)*tilt)]!=null){
                                map[i][j]=-1;
                            }
                            if(this.objectMap[k][y+Math.ceil((k-x)*tilt)]!=null){
                                map[i][j]=-1;
                            }
                        }
                    }
                }
                if(x>i){
                    if(map[i][j]>0){
                        const disX=j-y;
                        const disY=x-i;
                        const tilt=disX/disY;
                        for(let k=x;k>i;k--){
                            if(this.objectMap[k][y+Math.floor((x-k)*tilt)]!=null){
                                map[i][j]=-1;
                            }
                            if(this.objectMap[k][y+Math.ceil((x-k)*tilt)]!=null){
                                map[i][j]=-1;
                            }
                        }
                    }
                }
            }
        }

        
        // オブジェクトの設定
        for(let i=0;i<this.MAPSIZE.X;i++){
            for(let j=0;j<this.MAPSIZE.Y;j++){
                if(map[i][j]>=0){
                    this.blindMap[i][j]=false;
                    if(this.objectMap[i][j]!=null){
                        this.objectMap[i][j].visible=true;
                    }
                }
            }
        }
        this.blindManager.setBlindMap(this.blindMap);

    }

    // あかりの確保再起呼び出し用
    recursionVision(x,y,vision,map,count=0){
        if(count<=vision){
            map[x][y]=count;
            // 左
            if(y-1>=0)
                if(map[x][y-1]==-1 || count < map[x][y-1])
                    this.recursionVision(x,y-1,vision,map,count+1);
            // 上
            if(x-1>=0)
                if(map[x-1][y]==-1 || count < map[x-1][y])
                    this.recursionVision(x-1,y,vision,map,count+1);
            // 右
            if(y+1<this.MAPSIZE.Y)
                if(map[x][y+1]==-1 || count < map[x][y+1])
                    this.recursionVision(x,y+1,vision,map,count+1);
            // 下
            if(x+1<this.MAPSIZE.X)
                if(map[x+1][y]==-1 || count < map[x+1][y])
                    this.recursionVision(x+1,y,vision,map,count+1);
            }
    }



}