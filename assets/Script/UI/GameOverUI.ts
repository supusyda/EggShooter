// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameOverUI extends cc.Component {
  protected onEnable(): void {
    cc.tween(this.node)
      .to(1, { position: cc.v3(0, 0, 0), rotation: 360 })
      .to(1, { scale: 1 })
      .start();
  }
  // update (dt) {}
}
