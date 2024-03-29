// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import EggSpawnPoint from "./EggSpawnPoint";
import EggSpawner from "./EggSpawner";
import GameManager from "./GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EggSpawnerCtrl extends cc.Component {
  public EggSpawner: EggSpawner;
  public EggSpawnPlace: EggSpawnPoint;
  LoadBallSpawner() {
    this.EggSpawner = this.node.getComponent(EggSpawner);
    console.log("Success load EggSpawner");
  }
  LoadBallPlace() {
    this.EggSpawnPlace = this.node.getComponentInChildren(EggSpawnPoint);
    console.log("Success load EggSpawnPoint");
  }
  protected start(): void {
    this.LoadBallPlace();
    this.LoadBallSpawner();
    GameManager.Instance.setEggSpawnerCtr(this);
  }
  // update (dt) {}
}
