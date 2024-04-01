// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "./GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MoveWithParent extends cc.Component {
  protected start(): void {}
  protected update(dt: number): void {
    // this.node.setPosition(this.node.position.x, this.node.position.y - 0.09);
    // console.log(this.node.position.x, this.node.position.y);
    if (GameManager.Instance.isAlive != true) return;
    this.node.children.forEach((childNode) => {
      var tempPos = new cc.Vec2(childNode.position.x, childNode.position.y);
      childNode.setPosition(tempPos.x, tempPos.y - 0.09);
    });
  }

  // update (dt) {}
}
