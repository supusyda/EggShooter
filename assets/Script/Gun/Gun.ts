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
  public delayTime: number = 1;
  public delayTimerCounter: number = 0;

  @property(cc.Node) prefab: cc.Node = null;
  @property(cc.Node) holder: cc.Node = null;
  public trajectory: TrajectoryLine = null;

  protected onLoad(): void {
    Gun.Instance = this;

    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMouseMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onMouseUp, this);

    this.shoot = this.gun.getComponent(Shoot);
    this.firePoint = this.gun.getChildByName("FirePoint");
    this.trajectory = this.node.getComponentInChildren(TrajectoryLine);
  }
  // protected start(): void {}
  onMouseUp(event: cc.Event.EventMouse) {
    if (GameManager.Instance.isAlive != true) return;
    if (this.delayTimerCounter >= this.delayTime) {
      this.shoot.ShootThing(this.dir, this.gun.angle);
      this.gun.getComponent(cc.AudioSource).play();
      this.delayTimerCounter = 0;
    }

    this.trajectory.isActive = false;
    this.trajectory.ClearGraphic();
  }
  onMouseMove(event: cc.Event.EventMouse) {
    if (GameManager.Instance.isAlive != true) return;
    const mousePos = new cc.Vec2(event.getLocationX(), event.getLocationY());
    const nodePos = this.node.convertToNodeSpaceAR(mousePos);
    // Calculate the direction vector from node to mouse position
    let newDir = nodePos.subtract(this.gun.getPosition());
    newDir = newDir.normalize();
    let angleRadians = Math.atan2(newDir.y, newDir.x);
    let angleDegrees = cc.misc.radiansToDegrees(angleRadians);
    if (angleDegrees > 10 && angleDegrees < 170) {
      this.dir = newDir;
      this.gun.angle = angleDegrees;
      let worldPos = this.node.parent.convertToWorldSpaceAR(
        this.gun.getPosition()
      );
      let raycast = this.dir.mul(2000);
      raycast = raycast.add(worldPos);
      this.trajectory.graphics.clear();
      if (this.delayTimerCounter >= this.delayTime) {
        this.trajectory.endPointDir = raycast;
        this.trajectory.setDirAndEndPoint(raycast, this.dir.clone());
        this.trajectory.isActive = true;
      }
    }
  }
  protected update(dt: number): void {
    this.delayTimerCounter += dt;
  }
}
