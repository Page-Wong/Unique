
cc.Class({
    extends: cc.Component,

    properties: {        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },

    // 设置方块类型
    setType: function (containerType) {        
        this.containerTypes = [ cc.Layout.Type.HORIZONTAL, cc.Layout.Type.VERTICAL]
        this.containerType = this.containerTypes[containerType];
        this.getComponent(cc.Layout).Type = this.containerType;
        this.getComponent(cc.Layout).verticalDirection = cc.Layout.VerticalDirection.TOP_TO_BOTTOM
        this.getComponent(cc.Layout).horizontalDirection = cc.Layout.VerticalDirection.RIGHT_TO_LEFT
    },
    // 设置网格坐标
    setGridXY: function (x,y) {
        this.gridX = x;
        this.gridY = y;
        this.node.setPosition(this.node.parent.width * -1 + this.itemSize * x, this.node.parent.height * -1 + this.itemSize * y);
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
    },
    addItem:function (item) {
        this.node.addChild(item)
        switch (this.containerType) {
            case cc.Layout.Type.HORIZONTAL:
                this.node.height = item.height 
                break;
            case cc.Layout.Type.VERTICAL:    
            this.node.width = item.width           
                break;
        
            default:
                break;
        }
    }
});
