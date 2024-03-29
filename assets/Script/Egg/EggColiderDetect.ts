// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Egg from "./Egg";
import Fly from "./Fly";

const { ccclass, property } = cc._decorator;
@ccclass
export default class EggCollider extends cc.Component {
  public firstTouch: cc.Node = null;
  onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    if (this.node.group == "ShootEgg") {
      if (this.firstTouch == null) {
        this.firstTouch = other.node;
        this.node.parent.getComponent(Fly).moveSpeed = 0;
        const nodePos2 = other.node.parent.parent.convertToWorldSpaceAR(
          other.node.position
        );
        const nodePos3 = this.node.parent.parent.convertToNodeSpaceAR(nodePos2);
        this.node.parent.setPosition(nodePos3);
        this.node.parent.setRotation(0);
        this.node.group = "StickEgg";
        this.node.parent.getComponent(Egg).changeState();
        this.node.parent.getComponent(Fly).stop();
      }
    }
    // this.node.parent.getChildByName("SameEggDetect").active = true;
  }
  // update (dt) {}
}
