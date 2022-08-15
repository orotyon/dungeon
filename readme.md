# お試しダンジョンゲーム
## セットアップ
[Firebaseでモジュールバンドラーを使用する](https://firebase.google.com/docs/web/module-bundling)を参考にして進める
### 諸々を以下の通りインストール
```sh
# 初期化
npm init

# firebaseのインストール
npm i firebase

# webpackのインストール
npm install --save-dev webpack webpack-cli @webpack-cli/serve webpack-dev-server webpack-merge

# PIXIjsのインストール
npm i pixi.js

# webpackで使うディレクトリの作成
mkdir src
mkdir dist
```

### webpackの設定
[ここ](https://wemob.tatara.in.net/2021/01/19/how-to-install-use-webpack/)をみて同じようにする

weboack.common.js
devServer:contentBaseが最新では存在しない設定なので
[ここ](https://qiita.com/chocomint_t/items/4bc57945bce081922582)を参照

```json
// scriptsにbuildを追加する
  "scripts": {
    "build": "webpack --config webpack.prod.js",
    "start": "webpack-cli serve --config webpack.dev.js"
  },
```
/src/js/app.jsを適当でいいから作ってから```npm run build```を試してみる


### hostingの設定
```sh
firebase init
# (*)Hosting: Configure files for Firebase Hosting 
# (*)set up GitHub Action deploys, Hosting: Set up GitHub Action deploys

? What do you want to use as your public directory? 
  -> dist
? Configure as a single-page app (rewrite all urls to /index.html)?
  -> No
? Set up automatic builds and deploys with GitHub? Yes? What script should be run before every deploy?
  -> npm run build
```
404.htmlとかindex.htmlとかはいってくる
index.htmlは/dist/js/bandle.jsを参照するようにする
404.htmlはhostingが自動的に出してくれるのでとりあえず置いておく（気が向いたらいい感じに変える）


### emulatorをインストールする
[Emulator Suite](https://firebase.google.com/docs/emulator-suite/install_and_configure)
```sh
# emulatorのインストール
firebase init emulators
# emulatorの実行
firebase emulators:start
