// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../GameManager";
import Egg from "./Egg";
import SameEggDetect from "./SameEggDetect";
import TopDetecter from "./TopDetecter";

const { ccclass, property } = cc._decorator;

@ccclass
export default class OtherEggDetect extends cc.Component {
  public isCheck: boolean = false;

  public eggNear: cc.Node[] = [];
  protected onDisable(): void {
    // this.eggNear.length = 0;
    this.isCheck = false;
  }

  dfs() {
    let vertex: cc.Node = this.node.parent;
    // console.log(GameManager.Instance.list.concat());

    if (
      // GameManager.Instance.list.includes(vertex) ||
      vertex.children.length <= 0
    )
      return;
    vertex.getChildByName("HightLight").active = true;
    this.isCheck = true;
    if (!GameManager.Instance.listToCheckIsCut.includes(this.node.parent))
      GameManager.Instance.listToCheckIsCut.push(this.node.parent);
    for (let i = 0; i < this.eggNear.length; i++) {
      vertex = this.eggNear[i];
      if (
        // !GameManager.Instance.list.includes(vertex) &&
        vertex.getComponentInChildren(OtherEggDetect)?.isCheck == false
      ) {
        vertex.getComponentInChildren(OtherEggDetect).dfs();
      }
    }
  }
  search() {
    // console.log(this.eggNear.length);

    this.dfs();
    GameManager.Instance.FallBallDisConnect();
    GameManager.Instance.isAlowToShoot = true;
  }
  onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    let otherBall = other.node.parent.getComponentInChildren(OtherEggDetect);
    if (other.node.parent != self.node.parent && otherBall.isCheck == false) {
      this.eggNear.push(other.node.parent);
    }
  }
  onCollisionExit(other: cc.Collider, self: cc.Collider) {
    let index = this.eggNear.indexOf(other.node.parent, 0);
    if (index > -1) this.eggNear.splice(index, 1);
    // console.log(this.eggNear);
  }

  CheckSurround() {
    // this.ReMoveDontWantBall();
    let tempBool = true;
    this.eggNear.forEach((eggSur) => {
      if (!eggSur.getComponentInChildren(OtherEggDetect)) {
        // tempBool = true;
        return;
      } else {
        let egg: OtherEggDetect = eggSur.getComponentInChildren(OtherEggDetect);
        if (egg.isCheck == true) return;

        return (tempBool = false);
      }
    });
    return tempBool;
  }
}
