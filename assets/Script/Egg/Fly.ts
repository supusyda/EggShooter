// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Fly extends cc.Component {
  @property(Number) public moveSpeed: number = 0;
  public dir: cc.Vec2 = new cc.Vec2(0, 0);
  public rigidBody: cc.RigidBody = null;

  protected onLoad(): void {
    this.rigidBody = this.node.getComponent(cc.RigidBody);
  }
  protected update(dt: number): void {
    // this.rigidBody.linearVelocity = cc.v2(
    //   this.dir.x * this.moveSpeed,
    //   this.dir.y * this.moveSpeed
    // );
    // console.log(
    //   this.rigidBody.linearVelocity.x,
    //   this.rigidBody.linearVelocity.y
    // );
    // console.log(this.node.position);
  }
  shoot() {
    this.rigidBody.linearVelocity = cc.v2(
      this.dir.x * this.moveSpeed,
      this.dir.y * this.moveSpeed
    );
  }
  stop() {
    this.rigidBody.linearVelocity = cc.v2(this.dir.x * 0, this.dir.y * 0);
  }

  // update (dt) {}
}
