// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class EggPlace extends cc.Component {

    @property(cc.Node) upRight:cc.Node = null;
    @property(cc.Node) upLeft:cc.Node = null;
    @property(cc.Node) right:cc.Node = null;
    @property(cc.Node) left:cc.Node = null;
    @property(cc.Node) downRight:cc.Node = null;
    @property(cc.Node) downLeft:cc.Node = null;


    // update (dt) {}
}
