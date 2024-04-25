// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../GameManager";

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
  public justShootNode: Boolean = false;

  public eggPhysicNode: cc.Node = null;

  @property(Number) public eggIndex: number = 0;
  protected onEnable(): void {
    // console.log(this.node);

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
    this.node.group = "default";
    cc.tween(this.node.getChildByName("Model"))
      // Delay 1s
      .to(0.3, { scale: 0 })
      .call(() => {
        this.node.removeAllChildren();
        
      })
      .start();
  }
  DestroySelfGameOver(time) {
    this.scheduleOnce(() => {
      cc.tween(this.node.getChildByName("Model"))
        // Delay 1s
        .to(0.7, { scale: 2 })
        .to(1, { scale: 2.5 })
        .to(0.2, { scale: 0 })

        .start();
    }, time);
  }
  BallImpact() {
    cc.tween(this.node.getChildByName("Model"))
      // Delay 1s
      .to(
        0.1,
        {
          scale: 0.5,
        },
        { easing: "bounceOut" }
      )
      .to(
        0.3,
        {
          scale: 1,
        },
        { easing: "bounceOut" }
      )

      .start();
  }
  Fall() {
    let ccc = Math.random() * 70 * (Math.random() > 0.5 ? -1 : 1);
    console.log(ccc);

    this.node.group = "default";
    cc.tween(this.node.getChildByName("Model"))
      // Delay 1s
      .to(
        0.6,
        {
          position: new cc.Vec3(ccc, Math.random() * -70, 0),
          scale: 0,
        },
        { easing: "fade" }
      )
      .call(() => {
        this.node.removeAllChildren();
        let index = GameManager.Instance.listOfAllBall.indexOf(this.node);
        if (index > -1) GameManager.Instance.listOfAllBall.splice(index, 1);
        GameManager.Instance.activeBallNumber--;
      })
      .start();
  }
}
