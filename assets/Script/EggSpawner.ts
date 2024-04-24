// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "./GameManager";
import Spawner from "./Spawner";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EggSpawner extends Spawner {
  public static Instance: EggSpawner = null;
  @property({ multiline: true }) public eggPrefabName: string = "Egg";
  @property({ multiline: true }) public rowPrefabName: string = "Row";
  @property(cc.Node) rowPrefabs: cc.Node[] = [];
  @property(cc.Node) eggPrefabs: cc.Node[] = [];
  public bulletEggHolder: cc.Node = null;
  public eggSpawnHolder: cc.Node = null;
  public holderName = {
    EggSpawnHolder: "EggSpawnHolder",
    EggShootHolder: "EggShootHolder",
  };
  public SpawnRandomEgg() {
    // console.log(this.holder);
    console.log("CC");

    // console.log("this.rowPrefabs", this.rowPrefabs);

    for (let i = 0; i < 2; i++) {
      let row = cc.instantiate(this.rowPrefabs[i]);
      // todo: instantiate egg
      let numberOffEggToSpawn = 0;
      if (i == 0) {
        // row 1 spawn 8 egg
        numberOffEggToSpawn = 8;
      } else {
        // row 2 spawn 9 egg
        numberOffEggToSpawn = 9;
      }
      for (let eggIndex = 0; eggIndex < numberOffEggToSpawn; eggIndex++) {
        GameManager.Instance.activeBallNumber++;
        let randomEgg = Math.floor(Math.random() * 4);
        let newEgg = cc.instantiate(this.eggPrefabs[randomEgg]);
        newEgg.parent = row;
        newEgg.active = true;
        GameManager.Instance.listOfAllBall.push(newEgg);
      }
      row.parent = this.eggSpawnHolder;
      row.active = true;
    }
  }
  protected GetPrefabByName(prefabName: string): cc.Node {
    let targetPrefab: cc.Node = null;
    this.eggPrefabs.forEach((prefab) => {
      if (prefab.name == prefabName) {
        targetPrefab = prefab;
      }
    });
    return targetPrefab;
  }
  public SpawnThing(spawnPos: cc.Vec3, prefabName: string): cc.Node {
    // const nodePos = this.node.convertToNodeSpaceAR(spawnPos);
    let prefab = this.GetPrefabByName(prefabName);
    if (prefab == null) return null;
    let newNode: cc.Node = cc.instantiate(prefab);
    newNode.active = true;
    GameManager.Instance.activeBallNumber++;
    // console.log("+1");

    return newNode;
  }
  convertNodeSpace(pos) {
    return this.node.convertToNodeSpaceAR(pos);
  }
  protected LoadPrefabs(): void {
    this.node.getChildByName("Prefabs").children.forEach((element) => {
      if (element.name == "Row") {
        element.children.forEach((element) => {
          this.rowPrefabs.push(element);
        });
      } else {
        element.children.forEach((element) => {
          this.eggPrefabs.push(element);
        });
      }
    });
    console.log("Success Load prefabs");
  }
  protected GetPrefabByNameInPrefab(prefabName: string, prefabs): cc.Node {
    let targetPrefab: cc.Node = null;
    prefabs.forEach((prefab) => {
      if (prefab.name == prefabName) {
        targetPrefab = prefab;
      }
    });
    return targetPrefab;
  }
  protected LoadHolder(): void {
    super.LoadHolder();
    this.holder.children.forEach((element) => {
      if (element.name == this.holderName.EggSpawnHolder) {
        this.eggSpawnHolder = element;
      } else {
        this.bulletEggHolder = element;
      }
    });
  }
  protected onLoad(): void {
    this.LoadHolder();
    this.LoadPrefabs();
    EggSpawner.Instance = this;
  }
}
