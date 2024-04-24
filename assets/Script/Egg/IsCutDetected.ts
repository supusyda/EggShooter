// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../GameManager";
import Egg from "./Egg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class IsCutDetected extends cc.Component {
  public isCheck: boolean = false;
  public isSurroundClear: boolean = false;

  public effectedEggNear: Egg[] = [];

  protected onEnable(): void {
    console.log("WTF");
  }
  protected onDisable(): void {
    this.effectedEggNear.length = 0;
    this.isSurroundClear = false;
  }
  onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    // let otherBall = other.node.parent.getComponentInChildren(IsCutDetected);
    // if (
    //   other != self &&
    //   GameManager.Instance.listOfEffectedBall.includes(other.node.parent)
    // ) {
    //   // other.node.parent.getChildByName("OtherEggDetect").active = true;
    //   this.isCheck = true;
    //   if (otherBall.isCheck == false) {
    //     GameManager.Instance.listToCheckIsCut.push(other.node.parent);
    //     this.effectedEggNear.push(other.node.parent.getComponent(Egg));
    //     other.node.parent.getChildByName("HightLight").active = true;
    //     console.log("effectedEggNear", this.effectedEggNear);
    //   }
    // } else if (
    //   other === self &&
    //   this.node.parent == GameManager.Instance.listToCheckIsCut[0]
    // ) {
    //   this.isCheck = true;
    //   this.effectedEggNear.push(other.node.parent.getComponent(Egg));
    //   // GameManager.Instance.AddToList(this.node.parent);
    // }
    // if (this.CheckSurround() == true) {
    //   console.log("Check Surround = true");
    //   GameManager.Instance.CheckIsCut();
    // }
  }
  CheckSurround() {
    // let tempBool = true;
    // this.effectedEggNear.forEach((eggSur) => {
    //   let egg: Egg = eggSur.getComponent(Egg);
    //   if (egg.isCheck == true) return;
    //   return (tempBool = false);
    // });
    // this.isSurroundClear = tempBool;
    // return tempBool;
  }
}
