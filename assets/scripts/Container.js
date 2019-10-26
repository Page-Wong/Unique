
cc.Class({
    extends: cc.Component,

    properties: {  
        item:{
            type:cc.Prefab,
            default:null,
        },
        containerFrames:{
            type:[cc.SpriteFrame],
            default:[],
        },
        containerZoom:{
            type: cc.Float,
            default: 1
        },
        itemZoom:{
            type: cc.Float,
            default: 1
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.itemCount = 0;  
        this.items = [];      
        this.layoutTypes = [ cc.Layout.Type.HORIZONTAL, cc.Layout.Type.VERTICAL];        
        this.moveX = 0;        
        this.moveY = 0;
    },

    start () {
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
        //     var x = this.node.x;
        //     var y = this.node.y;
        //     if (this.containerType === 0) {  
        //         this.moveX += event.getDeltaX();
        //         if (this.moveX > this.cellSize) {
        //             x += Math.floor(this.moveX / this.cellSize) * this.cellSize;
        //             this.moveX = 0;
        //         } 
        //         else if (this.moveX < this.cellSize * -1) {
        //             x += Math.ceil(this.moveX / this.cellSize) * this.cellSize;
        //             this.moveX = 0;
        //         } 
        //     }
        //     else if (this.containerType === 1) {     
        //         this.moveY += event.getDeltaY();
        //         if (this.moveY > this.cellSize) {
        //             y += Math.floor(this.moveY / this.cellSize) * this.cellSize;
        //             this.moveY = 0;
        //         } 
        //         else if (this.moveY < this.cellSize * -1) {
        //             y += Math.ceil(this.moveY / this.cellSize) * this.cellSize;
        //             this.moveY = 0;
        //         }                 
        //     }             
        //     this.node.x = x;
        //     this.node.y = y;
        // }, this);
        
    },

    // 设置方块类型
    setType: function (containerType) {        
        this.containerType = containerType;
        this.getComponent(cc.Layout).type = this.layoutTypes[containerType];
        this.getComponent(cc.Sprite).spriteFrame = this.containerFrames[containerType];
        // this.getComponent(cc.Layout).verticalDirection = cc.Layout.VerticalDirection.TOP_TO_BOTTOM
        // this.getComponent(cc.Layout).horizontalDirection = cc.Layout.VerticalDirection.RIGHT_TO_LEFT
    },
    // 设置网格坐标
    setGridXY: function (x, y, index) {
        this.gridX = x;
        this.gridY = y;
        this.index = index;
        if (this.containerType === 0) {  
            this.queue = (y - 1) / 2;
        }
        else if (this.containerType === 1) {
            this.queue = (x - 1) / 2;            
        }
        this.node.setPosition(this.node.parent.width / 2 * -1 + this.cellSize / 2 * x, this.node.parent.height / 2 * -1 + this.cellSize / 2 * y);        
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
        this.cellSize = cellSize;
        this.itemSize = cellSize;    
        this.node.width = cellSize;
        this.node.height = cellSize;
    },
    addItem:function () {
        var item = cc.instantiate(this.item);
        item.getComponent('Item').setType(this.containerType);
        item.getComponent('Item').setItemSize(this.itemSize);
        this.node.addChild(item);
        this.items[this.itemCount] = item;
        this.itemCount += 1;
        // if (this.containerType === 0) {  
        //     this.node.width = this.cellSize * (this.itemCount - 1 + this.containerZoom);
        // }
        // else if (this.containerType === 1) {
        //     this.node.height = this.cellSize * (this.itemCount - 1 + this.containerZoom);
        // } 
    },
    reloadLayoutSetting () {
        var space = (this.node.width - this.itemSize * this.itemCount) / (this.itemCount + 1);
        this.getComponent(cc.Layout).paddingLeft = space;
        this.getComponent(cc.Layout).paddingRight = space;
        this.getComponent(cc.Layout).spacingX  = space;

        // this.itemSize = (this.cellSize * this.itemCount - 10*2 - 10 * (this.itemCount - 1)) / this.itemCount;
        // this.items.forEach(element => {
        //     element.getComponent('Item').setItemSize(this.itemSize);
        // });
    },
    onClick(){
        console.log(this.node.x, this.node.y, this.node.width, this.node.height)
    }
});
