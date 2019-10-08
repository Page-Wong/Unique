var difficultySetting=cc.Class({
    name:'difficultySetting',
    properties:{
        x:{
            type:cc.Integer,
            default:0,
        },
        y:{
            type:cc.Integer,
            default:0,
        },
        maxStep:{
            type:cc.Integer,
            default:0,
        },
    }
})

cc.Class({
    extends: cc.Component,

    properties: {
        container:{
            type:cc.Prefab,
            default:null,
        },
        item:{
            type:cc.Prefab,
            default:null,
        },
        horizontal_item_color:{
            type:cc.color,
            default:new cc.Color(255, 255, 255, 128),
        },
        vertical_item_color:{
            type:cc.color,
            default:new cc.Color(255, 255, 255, 128),
        },
        cross_item_color:{
            type:cc.color,
            default:new cc.Color(255, 255, 255, 128),
        },
        difficultyAry:{
            type:[difficultySetting],
            default:[],
        },
        difficulty:{
            type:cc.Integer,
            default:0,
        }
    },

    // LIFE-CYCLE CALLBACKS:
    _initCrossItems(){
        var tmpAry = []
        for (let i = 0; i < this._difficulty.x; i++) {
            tmpAry = []
            for (let j = 0; j < this._difficulty.y; j++) {
                var isInit = Math.round(Math.random())
                tmpAry.push(isInit)
            }         
            this.crossItems.push(tmpAry)
        }
    },
    _addHorizontalItem(crossItems){
        for (let i = 0; i < this._difficulty.x; i++) {
            for (let j = 0; j < this._difficulty.y; j++) {
                if (this.crossItems[i][j] == 1) {
                    var item = cc.instantiate(this.item);
                    item.width = this.itemWidth
                    item.height = this.itemHeight
                    this.tmpItemAry.push(item)
                }
                else if(this.tmpItemAry.length > 0) {
                    var container = cc.instantiate(this.container);
                    this.tmpItemAry.forEach(element => {
                        container.addChild(element)
                    });                    
                    container.width = this.itemWidth * this.tmpItemAry.length
                    container.height = this.itemHeight
                    container.type = cc.HORIZONTAL
                    this.tmpContainerAry.push(container)
                    this.tmpItemAry = []
                }
            } 
            if(this.tmpContainerAry.length > 0) {
                this.tmpContainerAry.forEach(element => {
                    this.node.addChild(element)
                });
                this.tmpContainerAry = []
            }
        }
    },
    _clearBoard(){
        this.crossItems = []
    },
    resetBoard(){
        this._clearBoard()
        this._initCrossItems()
        this._addHorizontalItem(this.crossItems)
    },
    onLoad () {
        this._difficulty = this.difficultyAry[this.difficulty]  
        this.tmpContainerAry = []
        this.tmpItemAry = []
        this.itemWidth = this.node.width / this._difficulty.x + 10
        this.itemHeight = this.node.height / this._difficulty.y + 10
        this.resetBoard()
    },

    start () {

    },

    // update (dt) {},
});
