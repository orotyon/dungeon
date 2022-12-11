import * as PIXI from 'pixi.js';
import * as OBJ from './obj';
import * as BLIND from './blind.js';
import * as TRAP1 from './objects/trap1.js'
import * as TRESURE1 from './objects/tresure.js'

export class ObjectManager{
    TILE;
    MAPSIZE;
    passable=false;
    transparentable=false;
    elmObject = new PIXI.Container();
    blindManager;
    objectTest = [
        [0,2,2,0,0,0,0,0,0,0,0,0,1,1,2,2,0,0,0,0],
        [0,2,0,0,0,0,1,1,1,1,1,0,0,0,2,2,0,1,0,0],
        [0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,2,0,0,0,0],
        [0,0,1,1,0,0,0,0,1,0,1,0,0,0,0,2,2,0,2,2],
        [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0],
        [0,0,1,1,0,0,1,1,1,1,1,0,0,0,1,0,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,0,0,1,1,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0],
        [0,1,1,1,0,2,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0]
    ];
    blindMap=[];
    viewMap=[];
    objectMap=[];
    

    constructor(TILE,MAPSIZE){
        this.MAPSIZE=MAPSIZE;
        this.TILE=TILE;
        const texture = PIXI.Texture.from('./res/obj1.png');
        const texture2 = PIXI.Texture.from('./res/obj2.png');

        // とりあえずテスト用にobjectTestからオブジェクトを配置
        for(let i=0;i<this.objectTest.length;i++){
            let objectLine=[];
            for(let j=0;j<this.objectTest[i].length;j++){
                if(this.objectTest[i][j]==1){
                    // 岩
                    const obj = new OBJ.Object(TILE,i,j,OBJ.VECTOR.DOWN,texture);
                    obj.terrain=true;
                    const sprites=obj.getSprites();
                    objectLine.push(obj);
                    for(let i=0;i<sprites.length;i++){
                        this.elmObject.addChild(sprites[i]);
                    }
                }
                else if(this.objectTest[i][j]==2){
                    // 池
                    const obj = new OBJ.Object(TILE,i,j,OBJ.VECTOR.DOWN,texture2);
                    const sprites=obj.getSprites();
                    obj.terrain=true;
                    obj.visible=false;
                    obj.passable=true;
                    obj.transparent=false;
                    obj.moveable=false;
                    objectLine.push(obj);
                    for(let i=0;i<sprites.length;i++){
                        this.elmObject.addChild(sprites[i]);
                    }
                }
                else {
                    objectLine.push(null);
                }
            }
            this.objectMap.push(objectLine);
        }

        // テストトラップ
        let trapX=4;
        let trapY=3;
        let trapRange=2;
        let trapAngle=0;
        let trapShift=1;
        let trapDamage=10;
        const trap = this.createTrap(TILE,trapX,trapY,OBJ.VECTOR.RIGHT,trapRange,trapAngle,trapShift,trapDamage);
        const trapSprites=trap.getSprites();
        trap.visible=false;
        trap.terrain=false;
        this.objectMap[trapX][trapY]=trap;
        for(let i=0;i<trapSprites.length;i++){
            this.elmObject.addChild(trapSprites[i]);
        }

        // おにぎりトラップ
        let onigiriX=8;
        let onigiriY=0;
        let onigiriRange=0;
        let onigiriAngle=0;
        let onigiriShift=0;
        let onigiriDamage=-30;
        const onigiri = this.createOnigiri(TILE,onigiriX,onigiriY,OBJ.VECTOR.RIGHT,onigiriRange,onigiriAngle,onigiriShift,onigiriDamage);
        const onigiriSprites=onigiri.getSprites();
        this.objectMap[onigiriX][onigiriY]=onigiri;
        for(let i=0;i<onigiriSprites.length;i++){
            this.elmObject.addChild(onigiriSprites[i]);
        }


        // テスト宝箱
        let tresureX=0;
        let tresureY=17;
        const tresure=this.createTresure(TILE,tresureX,tresureY,OBJ.VECTOR.DOWN);
        const tresureSprites=tresure.getSprites();
        this.objectMap[tresureX][tresureY]=tresure;
        for(let i=0;i<tresureSprites.length;i++){
            this.elmObject.addChild(tresureSprites[i]);
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
            const checkobj=this.objectMap[x][y];
            if(checkobj!=null)if(checkobj.moveable==false){
                result=false;
            }
        } 

        return result;
    }


    clearMap(){
        for(let i=0;i<this.MAPSIZE.X;i++){
            for(let j=0;j<this.MAPSIZE.Y;j++){
                this.blindMap[i][j]=true;
                if(this.objectMap[i][j]!=null){
                    // 地形オブジェクト以外は視界外になると見えなくする
                    if(this.objectMap[i][j].terrain==false)this.objectMap[i][j].visible=false;
                }
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
                    if(x<=i){
                        if(map[i][j]>-1){
                            const disX=j-y;
                            const disY=i-x;
                            const tilt=disY/disX;
                            for(let k=y;k<j;k++){
                                const checkobj=this.objectMap[x+Math.floor((k-y)*tilt)][k];
                                if(checkobj!=null)if(checkobj.passable==false){
                                    map[i][j]=-1;
                                }
                            }
                        }
                    }
                    if(x>=i){
                        if(map[i][j]>-1){
                            const disX=j-y;
                            const disY=i-x;
                            const tilt=disY/disX;
                            for(let k=y;k<j;k++){
                                const checkobj=this.objectMap[x+Math.ceil((k-y)*tilt)][k];
                                if(checkobj!=null)if(checkobj.passable==false){
                                    map[i][j]=-1;
                                }
                            }
                        }
                    }
                }
                if(y>j){
                    if(x>=i){
                        if(map[i][j]>0){
                            const disX=y-j;
                            const disY=i-x;
                            const tilt=disY/disX;
                            for(let k=y;k>j;k--){
                                const checkobj=this.objectMap[x+Math.ceil((y-k)*tilt)][k];
                                if(checkobj!=null)if(checkobj.passable==false){
                                    map[i][j]=-1;
                                }
                            }
                        }
                    }
                    if(x<=i){
                        if(map[i][j]>0){
                            const disX=y-j;
                            const disY=i-x;
                            const tilt=disY/disX;
                            for(let k=y;k>j;k--){
                                const checkobj=this.objectMap[x+Math.floor((y-k)*tilt)][k];
                                if(checkobj!=null)if(checkobj.passable==false){
                                    map[i][j]=-1;
                                }
                            }
                        }
                    }
                }
                if(x<i){
                    if(y<=j){
                        if(map[i][j]>0){
                            const disX=j-y;
                            const disY=i-x;
                            const tilt=disX/disY;
                            for(let k=x;k<i;k++){
                                const checkobj = this.objectMap[k][y+Math.floor((k-x)*tilt)];
                                if(checkobj!=null)if(checkobj.passable==false){
                                    map[i][j]=-1;
                                }
                            }
                        }
                    }
                    if(y>=j){
                        if(map[i][j]>0){
                            const disX=j-y;
                            const disY=i-x;
                            const tilt=disX/disY;
                            for(let k=x;k<i;k++){
                                const checkobj = this.objectMap[k][y+Math.ceil((k-x)*tilt)];
                                if(checkobj!=null)if(checkobj.passable==false){
                                    map[i][j]=-1;
                                }
                            }
                        }
                    }
                }
                if(x>i){
                    if(y>=j){
                        if(map[i][j]>0){
                            const disX=j-y;
                            const disY=x-i;
                            const tilt=disX/disY;
                            for(let k=x;k>i;k--){
                                const checkobj = this.objectMap[k][y+Math.ceil((x-k)*tilt)];
                                if(checkobj!=null)if(checkobj.passable==false){
                                    map[i][j]=-1;
                                }
                            }
                        }
                    }
                    if(y<=j){
                        if(map[i][j]>0){
                            const disX=j-y;
                            const disY=x-i;
                            const tilt=disX/disY;
                            for(let k=x;k>i;k--){
                                const checkobj = this.objectMap[k][y+Math.floor((x-k)*tilt)];
                                if(checkobj!=null)if(checkobj.passable==false){
                                    map[i][j]=-1;
                                }
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

    /**
     * 各オブジェクトのトリガーチェック
     * @param {*} player 
     */
     checkTriggers(player){
        for(let i=0;i<this.objectMap.length;i++){
            for(let j=0;j<this.objectMap[i].length;j++){
                const obj=this.objectMap[i][j];
                if(obj!=null){
                    obj.checkTrigger(player,this.objectMap);
                }
            }
        }
    }
    /**
     * 各オブジェクトを踏んだ時の処理
     * @param {*} player 
     */
     overObjects(player){
        for(let i=0;i<this.objectMap.length;i++){
            for(let j=0;j<this.objectMap[i].length;j++){
                const obj=this.objectMap[i][j];
                if(obj!=null && player.getX==i && player.getY==j){
                    obj.overObject(player);
                }
            }
        }
    }

    /**
     * テスト用トラップ生成関数
     * @param {TILE} tile 
     * @param {*} x 
     * @param {*} y 
     * @param {OBJ.VECTOR} vector 
     * @returns TRAP1.Trap1
     */
     createTrap(tile,x,y,vector,range,angle,shift,damage){
        const texture0 = PIXI.Texture.from('./res/trap/trap1-0.png');
        const texture1 = PIXI.Texture.from('./res/trap/trap1-1.png');
        const texture2 = PIXI.Texture.from('./res/trap/trap1-2.png');
        const texture3 = PIXI.Texture.from('./res/trap/trap1-3.png');
        const texture4 = PIXI.Texture.from('./res/trap/trap1-4.png');
        const obj = new TRAP1.Trap1(tile,x,y,vector,texture0,texture1,texture2,texture3,texture4,range,angle,shift,damage);
        return obj;
    }
    /**
     * テスト用おにぎりトラップ生成関数
     * @param {TILE} tile 
     * @param {*} x 
     * @param {*} y 
     * @param {OBJ.VECTOR} vector 
     * @returns TRAP1.Trap1
     */
    createOnigiri(tile,x,y,vector,range,angle,shift,damage){
        const texture0 = PIXI.Texture.from('./res/trap/onigiri-0.png');
        const texture4 = PIXI.Texture.from('./res/trap/onigiri-4.png');
        const obj = new TRAP1.Trap1(tile,x,y,vector,texture0,texture0,texture0,texture0,texture4,range,angle,shift,damage);
        obj.visible=false;
        obj.transparent=false;
        obj.passable=true;
        obj.moveable=true;
        obj.terrain=false;
        return obj;
    }

    /**
     * テスト用宝箱生成関数
     * @param {TILE} tile 
     * @param {*} x 
     * @param {*} y 
     * @param {OBJ.VECTOR} vector 
     * @returns TRESURE1.Tresure
     */
    createTresure(tile,x,y,vector){
        const texture1 = PIXI.Texture.from('./res/tresure/tresure1.png');
        const texture2 = PIXI.Texture.from('./res/tresure/tresure2.png');
        const obj = new TRESURE1.Tresure(tile,x,y,vector,texture1,texture1,texture1,texture1,texture2);
        obj.visible=false;
        obj.transparent=false;
        obj.passable=true;
        obj.moveable=true;
        obj.terrain=false;
        return obj;
    }

}