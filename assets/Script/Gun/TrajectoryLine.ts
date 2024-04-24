// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class TrajectoryLine extends cc.Component {
  graphics: cc.Graphics = null;
  public maxBounceAngle: number = 75;
  public angle: number = 0;
  public endPointDir: cc.Vec2 = new cc.Vec2(0, 0);
  public dir: cc.Vec2 = new cc.Vec2(0, 0);
  public numberOfPoint: number;
  public gap: number;
  public dt: number;
  public offSet: number = 0;
  public isActive: boolean = false;

  start() {
    // this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseDown, this);
    this.graphics = this.node.getComponent(cc.Graphics);
    // this.clearLineOverTime();
  }
  setDirAndEndPoint(end, dir) {
    this.dir = dir;
    this.endPointDir = end;
  }

  drawLine(start: cc.Vec2, endPoint: cc.Vec2, mag: number) {
    this.graphics.strokeColor = cc.Color.ORANGE; // Set line color
    this.graphics.lineWidth = 3; // Set line width
    this.graphics.moveTo(start.x, start.y);

    let end = endPoint.mul(mag).add(start);
    this.graphics.lineTo(end.x, end.y);
    this.graphics.stroke();
  }
  drawCircle(start: cc.Vec2, endPoint: cc.Vec2, mag: number) {
    let gap = 30;
    let radius = 10;
    this.graphics.lineWidth = 6; // Set line width
    let pointCount = 0;
    let newCurrentPosMag = 0;
    let newCurrentPos: cc.Vec2 = cc.Vec2.ZERO;
    let end = endPoint.normalize().clone();
    let dir = end.clone().normalizeSelf();

    pointCount = 0;

    let currentPos = start.clone();
    currentPos.x = start.x + this.offSet * end.normalizeSelf().x;
    currentPos.y = start.y + this.offSet * end.normalizeSelf().y;
    this.graphics.moveTo(start.x, start.y);
    this.graphics.circle(currentPos.x, currentPos.y, radius);
    while (newCurrentPosMag < mag - 50) {
      newCurrentPosMag = dir
        .clone()
        .mul(pointCount * gap)
        .mag();
      newCurrentPos = dir
        .clone()
        .mul(pointCount * gap)
        .add(currentPos);
      this.graphics.circle(newCurrentPos.x, newCurrentPos.y, radius);
      pointCount++;
    }
    this.graphics.fill();
    this.graphics.stroke();
  }

  draw(endPoint, dir: cc.Vec2) {
    let startPoint: cc.Vec2 = this.node.parent.convertToWorldSpaceAR(
      this.node.getPosition()
    );
    // this.graphics.clear();
    this.graphics.lineWidth = 10; // Set line width
    const result: cc.PhysicsRayCastResult[] = cc.director
      .getPhysicsManager()
      .rayCast(startPoint, endPoint, cc.RayCastType.All);
    if (result.length > 0) {
      let magOfLine = 0;
      let gunDir = dir.clone();
      let hit = null;
      result.forEach((res) => {
        // console.log(res.collider.node.group);
        if (res.collider.node.group == "Wall") {
          hit = res;
          magOfLine = this.node.parent
            .convertToNodeSpaceAR(res.point)
            .sub(this.node.getPosition())
            .mag(); //lay do dai tu súng đến tường
        }
      });
      if (magOfLine != 0 && hit != null) {
        // console.log("WTF");

        this.drawCircle(new cc.Vec2(0, 0), gunDir.normalizeSelf(), magOfLine);
        this.CalculateAngle(hit, dir.clone());
      } else {
       

        let gunDir = dir.clone();
        this.drawCircle(new cc.Vec2(0, 0), gunDir.normalizeSelf(), 2000);
      }
      //bắt đầu tính góc cho các đường tiếp theos
    } else {
      let gunDir = dir.clone();
      this.drawCircle(new cc.Vec2(0, 0), gunDir.normalizeSelf(), 2000);
    }
  }
  ClearGraphic() {
    this.graphics.clear();
  }
  protected CalculateAngle(hit: cc.PhysicsRayCastResult, dir: cc.Vec2) {
    // this.graphics.clear();

    let beginPoint = hit.point;
    let endPoint = null;
    let newnodePos = this.node.convertToNodeSpaceAR(beginPoint);
    dir.x = dir.x * -1;
    let raycastRange = dir.clone();
    raycastRange.mulSelf(1000).addSelf(beginPoint);
    let result: cc.PhysicsRayCastResult[] = cc.director
      .getPhysicsManager()
      .rayCast(beginPoint, raycastRange, cc.RayCastType.All);
    let i = 0;
    let newDir = dir.clone();
    if (result.length <= 0) {
      //nếu lần bắn raycast thứ 2 không đụng tường thì cho bắn ra 1 tia dài
      this.drawCircle(newnodePos, dir.clone(), 1500);
    } else {
      while (result.length > 0 && i <= 2) {
        if (endPoint == null) {
          result.forEach((res) => {
            // console.log(res.collider.name);

            if (res?.collider.node.group == "Wall") {
              endPoint = res.point;
              this.drawCircle(
                newnodePos,
                newDir,
                this.CalMagBetween2Point(beginPoint, endPoint)
              );
            }
          });
        }
        if (endPoint == null) {
          // console.log("no wall found first time");

          this.drawCircle(newnodePos, dir.clone(), 1500);
          return;
        }
        newDir.x = newDir.x * -1;
        let rayCastRange2 = newDir.clone().mul(1000).add(endPoint.clone()); //độ dài,hướng raycast
        result = cc.director
          .getPhysicsManager()
          .rayCast(endPoint, rayCastRange2, cc.RayCastType.All); //bắn raycast lần nữa
        beginPoint = endPoint.clone();
        let isTouchWall = false;
        result.forEach((res2) => {
          // console.log(res2.collider.name);
          if (res2.collider.node.group == "Wall") {
            console.log("isTouchWall = true so not draw long line");
            isTouchWall = true;
            endPoint = res2.point;
            newnodePos = this.node.convertToNodeSpaceAR(beginPoint.clone());
            this.drawCircle(
              newnodePos,
              newDir,
              this.CalMagBetween2Point(beginPoint, endPoint)
            );
            return;
          }
        });
        if (result.length <= 0 || isTouchWall == false) {
          // console.log("No wall found so draw a long line");
          // console.log("isTouchWall", isTouchWall);
          // console.log("result.length", result.length);

          let newnodePos3 = this.node.convertToNodeSpaceAR(beginPoint.clone());
          let newDir2 = newDir.clone();

          this.drawCircle(newnodePos3, newDir2, 1500);
          result.length = 0;
        }

        i++;
      }
    }
  }
  CalMagBetween2Point(point1: cc.Vec2, point2: cc.Vec2) {
    let magOfLine = this.node.parent
      .convertToNodeSpaceAR(point2)
      .sub(this.node.parent.convertToNodeSpaceAR(point1))
      .mag();

    return magOfLine;
  }
  protected lateUpdate(dt: number): void {
    this.graphics.clear();

    if (this.isActive == true) {
      this.offSet += 50 * dt;
      if (this.offSet > 30) this.offSet = 0;

      this.draw(this.endPointDir, this.dir);
    }
  }
}
