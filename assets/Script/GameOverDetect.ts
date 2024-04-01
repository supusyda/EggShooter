// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "./GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameOverDetect extends cc.Component {
  onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    GameManager.Instance.GameOver();
    console.log("GAME OVER");
    console.log(other);
  }
}
