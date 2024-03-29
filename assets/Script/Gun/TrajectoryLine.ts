// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Wall from "../Wall/Wall";
import Gun from "./Gun";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TrajectoryLine extends cc.Component {
  graphics: cc.Graphics = null;
  public maxBounceAngle: number = 75;
  public angle: number = 0;
  public endPointDir: cc.Vec2 = new cc.Vec2(0, 0);
  public hitPoint: cc.Vec2 = new cc.Vec2(0, 0);

  start() {
    // this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseDown, this);
    this.graphics = this.node.getComponent(cc.Graphics);
  }
  drawLine(start: cc.Vec2, endPoint: cc.Vec2) {
    // console.log("DrawLine");
    // let startPoint = this.node.convertToNodeSpaceAR(start);
    this.graphics.strokeColor = cc.Color.BLUE; // Set line color
    this.graphics.lineWidth = 10; // Set line width
    this.graphics.moveTo(start.x, start.y);
    // Draw a line to the end point
    let end = endPoint.mul(1000).add(start);
    this.graphics.lineTo(end.x, end.y);
    this.graphics.stroke();

    // this.graphics.
  }
  draw(endPoint, dir: cc.Vec2) {
    let startPoint: cc.Vec2 = this.node.parent.convertToWorldSpaceAR(
      this.node.getPosition()
    );
    this.graphics.clear();
    this.graphics.lineWidth = 10; // Set line width
    this.graphics.moveTo(0, 0);
    // Draw a line to the end point
    let gunDir = dir.clone();
    gunDir.mulSelf(1000);
    this.graphics.lineTo(gunDir.x, gunDir.y);
    const result: cc.PhysicsRayCastResult[] = cc.director
      .getPhysicsManager()
      .rayCast(startPoint, endPoint, cc.RayCastType.All);
    if (result[0] != null && result[0].collider.node.group == "Wall") {
      this.CalculateAngle(result[0], dir);
    }
    this.graphics.strokeColor = cc.Color.ORANGE; // Set line color

    this.graphics.stroke();
  }

  protected CalculateAngle(hit: cc.PhysicsRayCastResult, dir: cc.Vec2) {
    // dir.x = dir.x * -1;

    let newnodePos = this.node.convertToNodeSpaceAR(hit.point);
    
    dir.x = dir.x * -1;

    // dir.rotateSelf(Math.PI / 3);
    this.drawLine(newnodePos, dir);
  }
  protected update(dt: number): void {
    // this.draw();
  }
}
