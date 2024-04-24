// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Egg from "./Egg/Egg";
import IsCutDetected from "./Egg/IsCutDetected";
import OtherEggDetect from "./Egg/OtherEggDetect";
import SameEggDetect from "./Egg/SameEggDetect";
import TopDetecter from "./Egg/TopDetecter";
import EggSpawnerCtrl from "./EggSpawnCtrl";
import EggSpawner from "./EggSpawner";

import UIManager from "./UI/UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
  public static Instance: GameManager = null;
  public eggCtrl: EggSpawnerCtrl = null;
  @property(cc.Node)
  public eggHolder: cc.Node = null;
  public canShoot: boolean = true;
  public list: cc.Node[] = [];
  public listOfEffectedBall: cc.Node[] = [];
  public listToCheckIsCut: cc.Node[] = [];
  public listOfFirstNode: cc.Node[] = [];
  public listOfAllBall: cc.Node[] = [];
  public isCheck = false;
  public isAlowToShoot = true;

  public topBall: cc.Node;
  public isAlive: boolean = true;
  public mouseX: number = 0;
  public mouseY: number = 0;
  public ballNeedToTouch: cc.Node = null;
  public temp: number = 0;
  public activeBallNumber: number = 0;
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
  protected start(): void {
    // this.activeBallNumber = 100;
  }
  public setEggSpawnerCtr(eggCtrl) {
    this.eggCtrl = eggCtrl;
    // console.log(this.eggCtrl);

    if (this.eggCtrl == null) return;

    this.eggCtrl.EggSpawner.SpawnRandomEgg();
    // this.eggCtrl.EggSpawner.SpawnRandomEgg();
    // this.eggCtrl.EggSpawner.SpawnRandomEgg();
    // this.eggCtrl.EggSpawner.SpawnRandomEgg();
    // this.eggCtrl.EggSpawner.SpawnRandomEgg();
    // this.eggCtrl.EggSpawner.SpawnRandomEgg();
    this.schedule(() => {
      if (this.activeBallNumber < 120) {
        this.eggCtrl.EggSpawner.SpawnRandomEgg();
      }
    }, 0.1);
  }
  AddToListOfEffectedBall(Egg: cc.Node) {
    Egg.getChildByName("TopDetecter").active = true;
    Egg.getChildByName("RightDetecter").active = true;
    Egg.getChildByName("LeftDetecter").active = true;

    if (this.listOfEffectedBall.includes(Egg) || this.list.includes(Egg))
      return;
    this.listOfEffectedBall.push(Egg);
    this.FindHighBall();
    Egg.getChildByName("HightLight 2").active = true;
  }
  AddToList(Egg: cc.Node) {
    if (this.list.includes(Egg)) return;
    this.list.push(Egg);
    if (this.listToCheckIsCut.includes(Egg)) {
      let index = this.listToCheckIsCut.indexOf(Egg, 0);
      if (index > -1) this.listToCheckIsCut.splice(index, 1);
    }
  }

  FallBallDisConnect() {
    this.listOfAllBall.forEach((element, index) => {
      // console.log(this.list);

      if (
        !this.listToCheckIsCut.includes(element)
        // !this.list.includes(element)
      ) {
        console.log(element);

        if (element.getComponentInChildren(OtherEggDetect)) {
          element.getComponent(Egg).Fall();
          console.log("Fall");
        }
      }
    });
    this.listToCheckIsCut.forEach((element) => {
      if (element.children.length > 0) {
        element.getChildByName("HightLight").active = false;
        element.getComponentInChildren(OtherEggDetect).isCheck = false;
      } else {
       
      }
    });
  }
  DFS() {
    this.ballNeedToTouch.getComponentInChildren(OtherEggDetect).search();
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
  FindHighBall() {
    this.ballNeedToTouch = null;
    let tempBallY = null;
    let ballNeedToTouchY = null;
    this.listOfEffectedBall.forEach((element, index) => {
      if (this.ballNeedToTouch == null) {
        this.ballNeedToTouch = element;
      } else {
        tempBallY = this.eggHolder.convertToNodeSpaceAR(
          element.parent.convertToWorldSpaceAR(element.getPosition())
        ).y;
        ballNeedToTouchY = this.eggHolder.convertToNodeSpaceAR(
          this.ballNeedToTouch.parent.convertToWorldSpaceAR(
            this.ballNeedToTouch.getPosition()
          )
        ).y;

        if (ballNeedToTouchY < tempBallY) {
          this.ballNeedToTouch.getChildByName("HightLight 3").active = false;
          this.ballNeedToTouch = element;
        }
      }
    });
    if (this.ballNeedToTouch == null) return;
    this.ballNeedToTouch.getChildByName("HightLight 3").active = true;
    // this.listToCheckIsCut.push(this.ballNeedToTouch);
    // this.ballNeedToTouch.getChildByName("OtherEggDetect").active = true;
  }

  DeleteSameEggList() {
    for (let index = this.list.length - 1; index >= 0; index--) {
      this.list[index].getComponentInChildren(
        OtherEggDetect
      ).eggNear.length = 0;
      this.list[index].getComponent(Egg).DestroySelf();
      GameManager.Instance.activeBallNumber--;
      // console.log("-1");
    }
    this.list.length = 0;
    // this.ClearListAll();
  }
  ClearList() {
    this.list.forEach((egg) => {
      if (egg) {
        egg.getComponent(Egg).isCheck = false;
        egg.getComponent(Egg).collider.enabled = false;
        egg.getComponent(Egg).rootNode = false;
      }
    });
    if (this.listOfEffectedBall.length > 0) {
      this.listOfEffectedBall.forEach((element) => {
        if (element.children.length <= 0) return;

        element.getChildByName("HightLight").active = false;
        element.getChildByName("HightLight 2").active = false;
        element.getChildByName("TopDetecter").active = false;
        element.getChildByName("RightDetecter").active = false;
        element.getChildByName("LeftDetecter").active = false;
      });
    }
    this.listToCheckIsCut.forEach((element) => {
      if (element.children.length > 0) {
        element.getChildByName("HightLight").active = false;
        element.getComponentInChildren(OtherEggDetect).isCheck = false;
        element.getChildByName("TopDetecter").active = false;
        element.getChildByName("RightDetecter").active = false;
        element.getChildByName("LeftDetecter").active = false;
      }
    });
    this.listOfAllBall.forEach((element, index) => {
      if (element.children.length <= 0) {
        this.listOfAllBall.splice(index, 1);
      }
    });
    if (this.ballNeedToTouch != null) {
      this.ballNeedToTouch.getChildByName("HightLight 3").active = false;
      this.ballNeedToTouch = null;
    }
    this.listToCheckIsCut.length = 0;
    this.listOfEffectedBall.length = 0;
    this.list.length = 0;
    this.isCheck = false;
  }
  protected update(dt: number): void {
    // this.MoveEggDown();
  }

  CheckIsCut() {}
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

  // update (dt) {}
}
