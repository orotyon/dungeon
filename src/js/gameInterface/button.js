import * as PIXI from 'pixi.js';

export const MODE={
   OFF:0,
   ON:1
}



/**
 * 画面に表示するボタン
 */
export class Button{
   /**
    * ボタンのコンテナー
    * ONとOFFのスプライトとクリックイベントが入っている？
    * @param {PIXI.Container}
    */
   _buttonContainer = null;
   get buttonContainer() {
      return this._buttonContainer;
   }
   set buttonContainer(value) {
      this._buttonContainer = value;
   }

   _objSprites = [];
   get objSprites() {
      return this._objSprites;
   }
   set objSprites(value) {
      this._objSprites = value;
   }

   /**
    * クリック状態かどうかを表すモード
    */
   _mode = MODE.OFF;
   get mode() {
      return this._mode;
   }
   set mode(value) {
      this._mode = value;
      if(this.objSprites>0){
         if(value==MODE.ON){
            this.objSprites[MODE.ON].visible=true;
            this.objSprites[MODE.OFF].visible=false;
         }
         if(value==MODE.OFF){
            this.objSprites[MODE.ON].visible=false;
            this.objSprites[MODE.OFF].visible=true;
         }
      }
   }

   /**
    * コンストラクタ
    * @param {*} action 
    * @param {*} x 
    * @param {*} y 
    * @param {*} onTexture 
    * @param {*} offTexture 
    */
   constructor(x,y,onTexture,offTexture){
      this.mode=MODE.OFF;

      this.objSprites[MODE.ON]= new PIXI.Sprite(onTexture);
      this.objSprites[MODE.ON].visible=false;
      this.objSprites[MODE.OFF]= new PIXI.Sprite(offTexture);
      this.objSprites[MODE.OFF].visible=true;

      this.buttonContainer = new PIXI.Container();
      this.buttonContainer.x=x;
      this.buttonContainer.y=y;
      this.buttonContainer.addChild(this.objSprites[MODE.ON]);
      this.buttonContainer.addChild(this.objSprites[MODE.OFF]);
      this.buttonContainer.interactive=true;

      // this.buttonContainer
      // .on('mousedown', this.buttonDown);
      // this.buttonContainer
      // .on('touchstart', this.buttonDown);
      // this.buttonContainer
      // .on('mouseup', this.buttonUp);
      // this.buttonContainer
      // .on('touchend', this.buttonUp);
      // this.buttonContainer.interactive = true;

   }

   /**
    * ボタン押下時の処理
    */
   buttonDown(){
      console.log("buttonDown!");
      this.mode=MODE.ON;
   }
   /**
    * ボタン押上の処理
    */
   buttonUp(action){
      this.mode=MODE.OFF;
      action();
   }

   getContainer(){
      return this.buttonContainer;
   }
}
