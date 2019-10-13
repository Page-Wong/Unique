
cc.Class({
    extends: cc.Component,

    properties: {  
        item:{
            type:cc.Prefab,
            default:null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.itemCount = 0;
    },

    // start () {
        
    // },

    // 设置方块类型
    setType: function (containerType) {        
        this.containerTypes = [ cc.Layout.Type.HORIZONTAL, cc.Layout.Type.VERTICAL]
        this.containerType = this.containerTypes[containerType];
        this.getComponent(cc.Layout).Type = this.containerType;
        // this.getComponent(cc.Layout).verticalDirection = cc.Layout.VerticalDirection.TOP_TO_BOTTOM
        // this.getComponent(cc.Layout).horizontalDirection = cc.Layout.VerticalDirection.RIGHT_TO_LEFT
    },
    // 设置网格坐标
    setGridXY: function (x,y) {
        this.gridX = x;
        this.gridY = y;
        this.node.setPosition(this.node.parent.width / 2 * -1 + this.cellSize * x, this.node.parent.height / 2 * -1 + this.cellSize * y);
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
    setCellSize: function (cellSize) {
        this.cellSize = cellSize
        
        if (this.containerType === cc.Layout.Type.HORIZONTAL) {  
            this.itemSize = cellSize - this.getComponent(cc.Layout).paddingRight
        }
        else if (this.containerType === cc.Layout.Type.VERTICAL) {     
            this.itemSize = cellSize - this.getComponent(cc.Layout).paddingBottom          
        }
        this.node.width = cellSize
        this.node.height = cellSize
    },
    addItem:function () {
        var item = cc.instantiate(this.item);
        // item.name = 'h_'+ j + '_' + i
        if (this.containerType === cc.Layout.Type.HORIZONTAL) {            
            item.setPosition(0, this.cellSize / 2)
        }
        else if (this.containerType === cc.Layout.Type.VERTICAL) {       
            item.setPosition(this.cellSize / 2, 0)            
        }
        item.getComponent('Item').setItemSize(this.itemSize)
        this.node.addChild(item)
        this.itemCount += 1
    }
});
