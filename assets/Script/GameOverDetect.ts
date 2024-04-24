// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Egg from "./Egg/Egg";
import GameManager from "./GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameOverDetect extends cc.Component {
  onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    console.log("GAME OVER");
    if (other.node.parent.getComponent(Egg)?.justShootNode == false) {
      GameManager.Instance.GameOver();
    } else {
      this.scheduleOnce(() => {
        if (other.node?.parent?.getComponent(Egg)?.justShootNode == false) {
          GameManager.Instance.GameOver();
        } else {
          this.unscheduleAllCallbacks();
        }
      }, 2);
    }
  }
}
