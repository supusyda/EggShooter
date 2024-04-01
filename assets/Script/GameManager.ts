// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Egg from "./Egg/Egg";
import SameEggDetect from "./Egg/SameEggDetect";
import EggSpawnerCtrl from "./EggSpawnCtrl";
import Gun from "./Gun/Gun";
import UIManager from "./UI/UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
  public static Instance: GameManager = null;
  public eggCtrl: EggSpawnerCtrl = null;
  @property(cc.Node)
  public eggHolder: cc.Node = null;

  public list: cc.Node[] = [];
  public isAlive: boolean = true;
  public mouseX: number = 0;
  public mouseY: number = 0;

  protected onLoad(): void {
    GameManager.Instance = this;
    cc.director.getCollisionManager().enabled = true;
    cc.director.getPhysicsManager().enabled = true;
  }
  MoveEggDown() {
    if (GameManager.Instance.isAlive != true) return;
    this.eggHolder.children.forEach((child) => {
      child.setPosition(child.position.x, child.position.y - 0.09);
      console.log(child.position.x, child.position.y);
    });
  }
  protected start(): void {}
  public setEggSpawnerCtr(eggCtrl) {
    this.eggCtrl = eggCtrl;
    // console.log(this.eggCtrl);

    if (this.eggCtrl == null) return;
    // this.eggCtrl.EggSpawner.SpawnRandomEgg();
    // this.eggCtrl.EggSpawner.SpawnRandomEgg();
    // this.eggCtrl.EggSpawner.SpawnRandomEgg();
    // this.eggCtrl.EggSpawner.SpawnRandomEgg();
    // this.eggCtrl.EggSpawner.SpawnRandomEgg();
    // this.eggCtrl.EggSpawner.SpawnRandomEgg();
    // this.eggCtrl.EggSpawner.SpawnRandomEgg();
    // this.eggCtrl.EggSpawner.SpawnRandomEgg();
    // this.eggCtrl.EggSpawner.SpawnRandomEgg();
    // this.eggCtrl.EggSpawner.SpawnRandomEgg();
    // this.eggCtrl.EggSpawner.SpawnRandomEgg();
    // this.eggCtrl.EggSpawner.SpawnRandomEgg();
    // this.schedule(() => {
    //   this.eggCtrl.EggSpawner.SpawnRandomEgg();
    // }, 0.5);
  }
  AddToList(Egg: cc.Node) {
    if (this.list.includes(Egg)) return;

    this.list.push(Egg);
  }
  CheckDone() {
    // console.log("BEGIN CHECKING ---------------------------------");
    if (this.list.length <= 0) return;
    let isDoneFind = true;

    for (let index = this.list.length - 1; index >= 0; index--) {
      let element = this.list[index];

      isDoneFind = element
        .getComponentInChildren(SameEggDetect)
        .CheckSurround();
      if (isDoneFind == false) return;
    }
    // console.log(this.list);
    if (isDoneFind == true) {
      if (this.list[0].getComponent(Egg).rootNode == true) {
        if (this.list.length >= 3) {
          this.DeleteSameEggList();
        }
      } else {
        this.DeleteSameEggList();
      }
    }
    // console.log("DONE CHECKING ---------------------------------");
  }
  DeleteSameEggList() {
    for (let index = this.list.length - 1; index >= 0; index--) {
      console.log(index);
      this.list[index].getComponent(Egg).DestroySelf();
    }
    this.list.length = 0;
  }
  ClearList() {
    this.list.forEach((egg) => {
      if (egg) {
        egg.getChildByName("HightLight").active = false;
        egg.getComponent(Egg).isCheck = false;
        egg.getComponent(Egg).collider.enabled = false;
        egg.getComponent(Egg).rootNode = false;
      }
    });
    this.list.length = 0;
  }
  protected update(dt: number): void {
    // this.MoveEggDown();
  }
  CheckIsDoneFindSameEgg() {
    this.list.forEach((Egg) => {
      if (Egg.getComponentInChildren(SameEggDetect).isSurroundClear == false) {
        return;
      }
    });
    this.DeleteSameEggList();
  }
  public DelLastRow() {
    this.DeleteSameEggList();
  }
  public Restart() {
    cc.director.loadScene(cc.director.getScene().name);
  }
  public GameOver() {
    if (this.isAlive == true) {
      this.isAlive = false;
      UIManager.Instance.GameOverUI.active = true;
    }
  }
  public spawn2r() {
    this.eggCtrl.EggSpawner.SpawnRandomEgg();
  }
  // update (dt) {}
}
