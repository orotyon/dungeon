import * as PIXI from 'pixi.js';

export class Message{
    elmMessage = new PIXI.Container();
    messages=[];

    getMessage(){
        return this.elmMessage;
    }
    addMessage(msg){
        this.messages.push(msg);
    }

}