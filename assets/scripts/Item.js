
cc.Class({
    extends: cc.Component,

    properties: {
        horizontal_item_sprite:{
            type:cc.SpriteFrame,
            default:null,
        },
        vertical_item_sprite:{
            type:cc.SpriteFrame,
            default:null,
        },
        cross_item_sprite:{
            type:cc.SpriteFrame,
            default:null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.itemTypes = [ this.cross_item_sprite, this.horizontal_item_sprite, this.vertical_item_sprite,]
    },

    // 设置方块类型
    setType: function (itemType) {
        this.itemType = itemType;
        this.getComponent(cc.Sprite).spriteFrame = this.itemTypes[itemType];
    },
    // 设置网格坐标
    setGridXY: function (x,y) {
        this.gridX = x;
        this.gridY = y;
        this.node.setPosition((x-5)*75 + 75/2, (y-5)*75 + 75/2);
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
    // 移动到一个网格坐标
    goTo: function (x,y, delay) {
        this.gridX = x;
        this.gridY = y;
        this.node.runAction(cc.sequence(
            cc.delayTime(delay),
            cc.moveTo(0.1, cc.p((x-5)*75 + 75/2, (y-5)*75 + 75/2))
            ));
    }
});
