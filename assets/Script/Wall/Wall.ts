// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Fly from "../Egg/Fly";
import TrajectoryLine from "../Gun/TrajectoryLine";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Wall extends cc.Component {
  @property(cc.Node) public trajectory: TrajectoryLine = null;
  public maxBounceAngle: number = 75;
  public endPointDir: cc.Vec2 = new cc.Vec2(0, 0);
  public startPointDir: cc.Vec2 = new cc.Vec2(0, 0);

  protected start(): void {
    let physicCollider = this.getComponent(cc.PhysicsBoxCollider);
  }
  setEndpoint(startPoint: cc.Vec2, endpoint: cc.Vec2) {
    if (startPoint && endpoint) {
      this.endPointDir = endpoint;
      this.startPointDir = startPoint;
    }
  }
  onBeginContact(
    contact: cc.PhysicsContact,
    self: cc.PhysicsBoxCollider,
    other: cc.PhysicsCircleCollider
  ) {
    return;
    // let egg: cc.RigidBody = other.node.getComponent(cc.RigidBody);

    // let wall: cc.PhysicsBoxCollider = self.node.getComponent(
    //   cc.PhysicsBoxCollider
    // );
    // let ballDirection: cc.Vec2 = egg.linearVelocity.normalize();
    // let contactDistance: cc.Vec2 = egg.node.getPosition();
    // console.log("this.dir", this.endPointDir.x, this.endPointDir.y);
    // if (this.endPointDir.x != 0 && this.endPointDir.y != 0) {
    //   let newDir = this.endPointDir.normalizeSelf();
    //   // .sub(this.startPointDir.normalizeSelf())
    //   // .normalize();

    //   if (self.node.name == "Left") {
    //     newDir.mulSelf(-1);
    //   } else if (self.node.name == "Right") {
    //     newDir.mulSelf(1);
    //   }
    //   egg.node.getComponent(Fly).dir = newDir;
    //   // ballDirection
    // } else {
    //   let bounceAngle = 0;
    //   if (self.node.name == "Up") {
    //     bounceAngle = contactDistance.x / wall.size.width;
    //   } else if (self.node.name == "Left") {
    //     bounceAngle = contactDistance.y / wall.size.height;
    //   } else if (self.node.name == "Right") {
    //     bounceAngle = contactDistance.y / wall.size.height;
    //   } else if (self.node.name == "Down") {
    //     bounceAngle = contactDistance.x / wall.size.width;
    //   }
    //   egg.node.getComponent(Fly).moveSpeed = 200;
    //   // this.endPointDir.rotateSelf(Math.PI / 2);
    //   egg.node.getComponent(Fly).dir = egg.node
    //     .getComponent(Fly)
    //     .dir.rotateSelf(cc.misc.radiansToDegrees(bounceAngle));
    // }
  }
}
