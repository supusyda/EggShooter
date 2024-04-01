// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {
  public static Instance: UIManager = null;
  @property(cc.Node) public GameOverUI: cc.Node;
  protected start(): void {
    UIManager.Instance = this;
  }
  protected onEnable(): void {
   
  }

  // update (dt) {}
}
