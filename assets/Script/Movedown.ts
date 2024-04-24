// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
import GameManager from "./GameManager";

@ccclass
export default class Movedown extends cc.Component {
  protected update(dt: number): void {
    if (GameManager.Instance.isAlive != true) return;
    var tempPos = new cc.Vec2(this.node.position.x, this.node.position.y);
    this.node.setPosition(tempPos.x, tempPos.y - 0.09);
    if (this.node.children.length > 0) {
      this.node.children.forEach((element) => {
        if (element.children.length > 0) {
          //   console.log(element);
          element.children.forEach((element2) => {
            element2.getComponent(cc.RigidBody).syncPosition(true);
          });
        }
      });
    }

    // console.log(this.node.position.x, this.node.position.y);
    // this.node.children.forEach((childNode) => {
    //   var tempPos2 = new cc.Vec2(
    //     childNode.position.x,
    //     childNode.position.y - 0.09
    //   );
    //   // childNode.setPosition(tempPos.x, tempPos.y - 0.09);
    //   childNode.setPosition(tempPos2.x, tempPos2.y);
    // });
  }

  // update (dt) {}
}
