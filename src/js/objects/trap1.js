import * as PIXI from 'pixi.js';
import * as OBJECT from '../obj.js';

/**
 * 射程と射角を設定するタイプのトラップ
 */
export class Trap1 extends OBJECT.Object{
    _range;
    get range() {
        return this._range - this.shift;
    }
    set range(value) {
        this._range = value;
    }
    _angle;
    get angle() {
        return this._angle;
    }
    set angle(value) {
        this._angle = value;
    }
    _shift;
    get shift() {
        return this._shift;
    }
    set shift(value) {
        this._shift = value;
    }
    _damage;
    get damage() {
        return this._damage;
    }
    set damage(value) {
        this._damage = value;
    }

    

    constructor(TILE,x,y,vector,downTexture,leftTexture=downTexture,rightTexture=downTexture,upTexture=downTexture,brokenTexture=downTexture,range=3,angle=180,shift=1,damage=10){
        super(TILE,x,y,vector,downTexture,leftTexture,rightTexture,upTexture,brokenTexture);
        this.range=range;
        this.shift=shift;
        this.angle=angle
        this.damage=damage;
    }

    checkTrigger(player,objectMap){
        // 壊れていない場合にトリガーチェック
        if(this.vector!=OBJECT.VECTOR.BROKEN){

            // 射程範囲の初期化
            const map=[];
            for(let i=0;i<objectMap.length;i++){
                const line=[];
                for(let j=0;j<objectMap[i].length;j++){
                    line.push(-1);
                }
                map.push(line);
            }

            // 向きと最低レンジの計算
            let startX=this.x;
            let startY=this.y;
            switch(this.vector){
                case OBJECT.VECTOR.DOWN:
                    startX+=this.shift;
                    break;
                case OBJECT.VECTOR.LEFT:
                    startY-=this.shift;
                    break;
                case OBJECT.VECTOR.RIGHT:
                    startY+=this.shift;
                    break;
                case OBJECT.VECTOR.UP:
                    startX-=this.shift;
                    break;
            }
            
            // 射程を計算して
            this.recursionRange(startX,startY,this.range,map);
            // 射角を計算
            this.calcAngle(startX,startY,map);
            // プレイヤーがレンジ内にいる場合
            if(map[player.x][player.y]!=-1){
                player.hp=player.hp-this.damage;
            }
        }
    }

    // 罠の射角計算
    calcAngle(x,y,map){
        for(let i=0;i<map.length;i++){
            for(let j=0;j<map[i].length;j++){
                if(map[i][j]!=-1){
                    // 配列的な[x][y]と数学的なX軸Y軸の計算が逆になるのってどうしたらいいのだろうか・・・
                    // とりあえず上向きをベースとして向きが違う場合に計算しなおしている
                    let px=y-j;
                    let py=(x-i);
                    let tmpx=px;
                    switch(this.vector){
                        case OBJECT.VECTOR.DOWN:
                            py*=-1;
                            break;
                        case OBJECT.VECTOR.LEFT:
                            px=py*-1;
                            py=tmpx;
                            break;
                        case OBJECT.VECTOR.RIGHT:
                            px=py;
                            py=tmpx*-1;
                            break;
                        case OBJECT.VECTOR.UP:
                            break;
                    }
                    if(px==-0)px=0;
                    if(py==-0)py=0;

                    // 真正面を0度とするので1/2して、絶対値にする
                    // オブジェクトの射角を超えている場合は範囲外
                    // 0,0のとき角度0になるので
                    const calcAngle=Math.abs((Math.atan2(px, py) * 180 / Math.PI));
                    if(calcAngle>(this.angle/2) && (px!=0 || py!=0)){
                        map[i][j]=-1;
                    }
                }
            }
        }
    }


    // 罠の射程範囲チェック
    recursionRange(x,y,range,map,count=0){
        const mapsizeX=map.length;
        const mapsizeY=map[0].length;
        
        if(count<=range){
            map[x][y]=count;
            // 左
            if(y-1>=0)
                if(map[x][y-1]==-1 || count < map[x][y-1])
                    this.recursionRange(x,y-1,range,map,count+1);
            // 上
            if(x-1>=0)
                if(map[x-1][y]==-1 || count < map[x-1][y])
                    this.recursionRange(x-1,y,range,map,count+1);
            // 右
            if(y+1<mapsizeY)
                if(map[x][y+1]==-1 || count < map[x][y+1])
                    this.recursionRange(x,y+1,range,map,count+1);
            // 下
            if(x+1<mapsizeX)
                if(map[x+1][y]==-1 || count < map[x+1][y])
                    this.recursionRange(x+1,y,range,map,count+1);
        }
    }

    /**
     * 上に乗った時の処理
     * @param {*} player 
     */
    overObject(player){
        this.vector=OBJECT.VECTOR.BROKEN;
    }
}
