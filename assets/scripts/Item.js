
cc.Class({
    extends: cc.Component,

    properties: {
        itemFrames:{
            type:[cc.SpriteFrame],
            default:[],
        },        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },

    // 设置方块类型
    setType: function (itemType) {        
        this.itemType = itemType;
        this.setFrame(itemType);
    },
    setFrame (frameType) {
        this.getComponent(cc.Sprite).spriteFrame = this.itemFrames[frameType];
    },
    setItemSize: function (itemSize) {
        this.itemSize = itemSize
        if (this.itemType === 0) {
            this.node.width = itemSize;
            this.node.height = itemSize / 2;        
        }
        else {
            this.node.width = itemSize / 2;
            this.node.height = itemSize;
        }
    },
    // 设置网格坐标
    setGridXY: function (x,y) {
        this.gridX = x;
        this.gridY = y;
    },
    setSelected:function(selected) {
        if (!selected) {
            this.node.stopAllActions();
            this.node.setScale(1.17);
        } else {
            this.node.runAction(
                cc.repeatForever(cc.sequence(
                    cc.scaleTo(0.3, 1),
                    cc.scaleTo(0.3, 1.17)
                )));
        }
    },
    onClick(){
        // console.log(this.node.x, this.node.y, this.node.width, this.node.height)
        console.log(this.node.convertToWorldSpaceAR(this.node.getPosition()))
    }
});
