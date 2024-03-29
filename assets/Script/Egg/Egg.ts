// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
enum EggsState {
  isShoted,
  isStick,
}
@ccclass
export default class Egg extends cc.Component {
  public state: EggsState = EggsState.isStick;
  public isCheck: boolean = false;
  public collider: cc.Collider = null;
  public eggEmpty: cc.Node = null;
  public rootNode: Boolean = false;
  public eggPhysicNode: cc.Node = null;

  @property(Number) public eggIndex: number = 0;
  protected onEnable(): void {
    this.eggEmpty = this.node.getChildByName("EmptyEgg");
    this.collider = this.node
      .getChildByName("SameEggDetect")
      .getComponent(cc.CircleCollider);
    this.collider.enabled = false;
    this.eggPhysicNode = this.node.getChildByName("EggPhysic");
  }
  changeState() {
    this.node.getChildByName("EggPlacement").active = true;
  
  }
  DestroySelf() {
    this.rootNode = false;
    cc.tween(this.node.getChildByName("Model"))
      // Delay 1s
      .to(0.3, { scale: 0 })
      .call(() => {
        this.node.removeAllChildren();
      })
      .start();
  }
  protected update(dt: number): void {}
  findNearSameType() {}
}
