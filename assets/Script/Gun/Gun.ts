// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../GameManager";
import Shoot from "./Shoot";
import TrajectoryLine from "./TrajectoryLine";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Gun extends cc.Component {
  @property(cc.Node) gun: cc.Node = null;
  public static Instance: Gun = null;
  public mousePos: cc.Vec3;
  public firePoint: cc.Node = null;
  public shoot: Shoot = null;
  public dir: cc.Vec2 = cc.Vec2.ZERO;
  public currentEgg: cc.Node = null;
  @property(cc.Node) prefab: cc.Node = null;
  @property(cc.Node) holder: cc.Node = null;
  public trajectory: TrajectoryLine = null;

  protected onLoad(): void {
    Gun.Instance = this;
    this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
    this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
    this.shoot = this.gun.getComponent(Shoot);
    this.firePoint = this.gun.getChildByName("FirePoint");
    // this.currentEgg = this.gun.getChildByName("CurrentEgg");
    this.trajectory = this.node.getComponentInChildren(TrajectoryLine);
    // this.trajectory.drawRayCast()
  }
  protected start(): void {
    this.schedule(() => {
      let worldPos = this.node.parent.convertToWorldSpaceAR(
        this.gun.getPosition()
      );
      let raycast = this.dir.mul(2000);
      raycast = raycast.add(worldPos);
      this.trajectory.draw(raycast, this.dir.clone());
    }, 0.01);
  }
  onMouseUp(event: cc.Event.EventMouse) {
    if (GameManager.Instance.isAlive != true) return;
    this.shoot.ShootThing(this.dir, this.gun.angle);
    this.gun.getComponent(cc.AudioSource).play();
  }
  onMouseMove(event: cc.Event.EventMouse) {
    if (GameManager.Instance.isAlive != true) return;
    const mousePos = new cc.Vec2(event.getLocationX(), event.getLocationY());
    const nodePos = this.node.convertToNodeSpaceAR(mousePos);
    // Calculate the direction vector from node to mouse position
    this.dir = nodePos.subtract(this.gun.getPosition());
    this.dir = this.dir.normalize();
    let angleRadians = Math.atan2(this.dir.y, this.dir.x);
    let angleDegrees = cc.misc.radiansToDegrees(angleRadians);
    // this.node.getChildByName("TrajectoryLine").rotation = -this.gun.angle + 90;
    this.gun.angle = angleDegrees;
  }
  protected update(dt: number): void {}
}
