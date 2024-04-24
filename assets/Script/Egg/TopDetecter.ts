// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../GameManager";
import OtherEggDetect from "./OtherEggDetect";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TopDetecter extends cc.Component {
  public HaveTopConnecter: boolean = true;
  public topDectectBall: cc.Node[] = [];
  protected onDisable(): void {
    this.topDectectBall.length = 0;
    // this.HaveTopConnecter = true;
  }
  onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    if (other.node != self.node) {
      this.topDectectBall.push(other.node);
      // this.HaveTopConnecter = true;
      // this.node.parent.getChildByName("HightLight 2").active = false;
    }
  }
  onCollisionExit(other: cc.Collider, self: cc.Collider) {
    // if (GameManager.Instance.listOfEffectedBall.includes(this.node.parent)) {
    if (this.topDectectBall.length > 0) {
      let index = this.topDectectBall.indexOf(other.node, 0);
      if (index > -1) this.topDectectBall.splice(index, 1);
      // if(GameManager.Instance.isCheck==true)

      if (this.topDectectBall.length == 0) {
        if (GameManager.Instance.isCheck == true) return;
        if (GameManager.Instance.ballNeedToTouch != null) {
          GameManager.Instance.isAlowToShoot = false;

          GameManager.Instance.isCheck = true;

          GameManager.Instance.DFS();
        }
      }
    }
  }
  // }
}
