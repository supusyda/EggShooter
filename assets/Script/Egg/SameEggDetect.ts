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
export default class SameEggDetect extends cc.Component {
  public thisEgg: Egg = null;
  public isSurroundClear: boolean = false;
  public sameEggNear: Egg[] = [];

  protected onEnable(): void {
    this.thisEgg = this.node.parent.getComponent(Egg);
  }
  onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    let otherEgg: Egg = other.node.parent?.getComponent(Egg);
    // if(otherEgg.eggIndex == this.thisEgg.eggIndex )
    // {
    //   if(other==self&&GameManager.Instance.)
    //   {

    //   }
    // }
    if (
      otherEgg &&
      otherEgg.eggIndex == this.thisEgg.eggIndex &&
      other != self
    ) {
      otherEgg.collider.enabled = true;

      this.thisEgg.isCheck = true;
      // GameManager.Instance.AddToList(this.node.parent);

      if (otherEgg.isCheck == false) {
        this.sameEggNear.push(other.node.parent.getComponent(Egg));
        other.node.parent.getChildByName("HightLight").active = true;

        console.log("Collision Active");
        console.log("add next node");
        GameManager.Instance.AddToList(other.node.parent);
      }
    } else if (
      this.thisEgg == GameManager.Instance.list[0]?.getComponent(Egg) &&
      otherEgg.eggIndex == this.thisEgg.eggIndex
    ) {
      this.sameEggNear.push(other.node.parent.getComponent(Egg));
      GameManager.Instance.AddToList(this.node.parent);
    }
    if (this.CheckSurround()) {
      GameManager.Instance.CheckDone();
    }
  }
  CheckSurround() {
    let tempBool = true;
    this.sameEggNear.forEach((eggSur) => {
      let egg: Egg = eggSur.getComponent(Egg);
      if (egg.isCheck == true) return;
      return (tempBool = false);
    });
    this.isSurroundClear = tempBool;
    return tempBool;
  }
}
