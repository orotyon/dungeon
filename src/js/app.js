import * as PIXI from 'pixi.js';
import * as Dungeon from './dungeon.js';

/* ゲーム全体で使う定数 */
const GAME={
    WIDTH:640,
    HEIGHT:320
}
// ゲーム全体で使う変数
const gameScenes = {
    /* "gameScene": <Container> */
    /* "gameScene2": <Container> */
  }; // シーン保存領域
  let currentScene; // 現在表示されているシーン

/*PIXIの設定*/
let app = new PIXI.Application({
    width: GAME.WIDTH,
    height: GAME.HEIGHT,
    backgroundColor: 0x1099bb
});
document.body.appendChild(app.view);
gameScenes.titleScene = createTitleScene();
app.stage.addChild(gameScenes.titleScene);
gameScenes.dungeonScene=Dungeon.createDungeonScene()
app.stage.addChild(gameScenes.dungeonScene);
currentScene=gameScenes.titleScene;

/**
 * タイトル
 */
function createTitleScene(){
    const titleScene = new PIXI.Container();
    titleScene.visible=true;

    const basicText = new PIXI.Text('タイトル工事中');
    basicText.x = 50;
    basicText.y = 100;
    titleScene.addChild(basicText);

    const basicText2 = new PIXI.Text('エンターorタップで次へ進む');
    basicText2.x = 50;
    basicText2.y = 120;
    titleScene.addChild(basicText2);

    //クリックイベントの登録
    titleScene.interactive = true;
    titleScene.hitArea= new PIXI.Rectangle(0, 0, GAME.WIDTH, GAME.HEIGHT);
    titleScene
    .on('click', titleOnClick)
    .on('touchstart', titleOnClick);


    
    return titleScene;
}

/**
 * タイトルのクリックイベント
 * @param {event} e 
 */
function titleOnClick(e){
    console.log('click'+e);
    goDungeon();
}

/**
 * シーン切り替え
 */
function goDungeon(){

    fadeOut(currentScene, () => {
        currentScene = gameScenes.dungeonScene;
        currentScene.alpha = 1.0;
        currentScene.visible = true;
      });
  
      function fadeOut(sprite, cb) {
        sprite.alpha = sprite.alpha - 0.1;
        if (sprite.alpha <= 0) {
          sprite.visible = false;
          return cb && cb(null);
        }

    setTimeout(() => {
        fadeOut(sprite, cb);
      }, 100);
    }
}