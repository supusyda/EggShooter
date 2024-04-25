// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Egg from "../Egg/Egg";
import Fly from "../Egg/Fly";
import EggSpawner from "../EggSpawner";
import GameManager from "../GameManager";
import Gun from "./Gun";
import TrajectoryLine from "./TrajectoryLine";
const { ccclass, property } = cc._decorator;
@ccclass
export default class Shoot extends cc.Component {
  protected start(): void {
    this.setUpCurrentBullet();
  }
  ShootThing(dir, angle) {
    if (GameManager.Instance.isAlowToShoot == false) return;
    let shootedEgg = this.node.parent.getComponent(Gun).currentEgg;
    // shootedEgg.position = nodePos;
    const nodePos = this.node.convertToWorldSpaceAR(
      Gun.Instance.firePoint.position
    );
    shootedEgg.position = EggSpawner.Instance.convertNodeSpace(nodePos);
    shootedEgg.getChildByName("EggBox").group = "ShootEgg";

    shootedEgg.active = true;
    shootedEgg.parent = EggSpawner.Instance.bulletEggHolder;
    shootedEgg.getChildByName("EggPlacement").active = false;
    shootedEgg.getComponent(Fly).moveSpeed = 1500;
    shootedEgg.getComponent(Fly).dir = dir;
    shootedEgg.getComponent(Fly).shoot();
    shootedEgg.rotation = angle;
    shootedEgg.getComponent(Egg).collider.enabled = true;
    GameManager.Instance.ClearList();
    shootedEgg.getComponent(Egg).isCheck = true;
    shootedEgg.getComponent(Egg).rootNode = true;
    shootedEgg.getComponent(Egg).justShootNode = true;

    // console.log(shootedEgg);
    GameManager.Instance.AddToList(shootedEgg);

    this.setUpCurrentBullet();
  }

  Trajectory(dir, angle, prefab) {
    let shootedEgg = cc.instantiate(prefab);
    // shootedEgg.position = nodePos;

    const nodePos = this.node.convertToWorldSpaceAR(
      Gun.Instance.firePoint.position
    );
    shootedEgg.parent = this.node.parent.getComponent(Gun).holder;

    shootedEgg.position = EggSpawner.Instance.convertNodeSpace(nodePos);
    shootedEgg.active = true;
    shootedEgg.getComponent(Fly).moveSpeed = 200;
    shootedEgg.getComponent(Fly).dir = dir;

    // shootedEgg.rotation = angle;
  }
  protected update(dt: number): void {
    this.node.parent.getComponent(Gun).holder.children.forEach((element) => {
      element.getComponent(cc.RigidBody).syncPosition(true);
    });
  }
  setUpCurrentBullet() {
    let randomEgg = Math.floor(Math.random() * 4);
    let shootedEgg = EggSpawner.Instance.SpawnThing(
      cc.Vec3.ZERO,
      EggSpawner.Instance.eggPrefabs[randomEgg].name
    );
    randomEgg++;
    this.node.getChildByName("CurrentEgg").getComponent(cc.Sprite).spriteFrame =
      shootedEgg
        .getChildByName("Model")
        .getChildByName("0" + randomEgg)
        .getComponent(cc.Sprite).spriteFrame;
    // shootedEgg.active = false;
    this.node.parent.getComponent(Gun).currentEgg = shootedEgg;
    this.node.getChildByName("CurrentEgg").width = 24;
    this.node.getChildByName("CurrentEgg").height = 24;

    // this.node.getChildByName("CurrentEgg")
  }

  // update (dt) {}
}
