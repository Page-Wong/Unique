
cc.Class({
    extends: cc.Component,

    properties: {  
        board: {
            type: cc.Node,
            default: null,
        },  
        item:{
            type:cc.Prefab,
            default:null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // this.board.height = this.board.width;
    },
    setItemSize: function (itemSize) {
        this.itemSize = itemSize
    },
    // 设置网格坐标
    setBoardSize: function (width, height) {
        this.node.width = width;
        this.node.height = height;
    },
    addItem(x, y){
        var item = cc.instantiate(this.item);
        let c_item = item.getComponent('Item');
        c_item.setType(2);
        c_item.setItemSize(this.itemSize);        
        item.parent = this.board;
        c_item.setGridXY(x, y);
    },       
    initTipsView(crossItems, itemSize){
        this.clearView();
        this.setItemSize(itemSize);
        for (let i = 0; i < crossItems.length; i++) {
            for (let j = 0; j < crossItems[i].length; j++) {
                if (crossItems[i][j] === 1) {                    
                    this.addItem(i, j);
                }
            }
        }
    },  
    clearView(){
        this.board.removeAllChildren();
    },
    hideView(){        
        this.node.active = false;      
    }
});
