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
        for (let i = 0; i < this._difficulty.y; i++) {
            this.itemAry[i] = []
            this.containerAry[i] = []
            for (let j = 0; j < this._difficulty.x; j++) {
                if (this.crossItems[j][i] === 1) {
                    var item = cc.instantiate(this.item);
                    item.name = 'h_'+ j + '_' + i
                    item.setPosition(0, this.itemSize / 2)
                    item.getComponent('Item').setItemSize(this.itemSize)
                    this.itemAry[i].push(item)
                }
                if(this.itemAry[i].length > 0 && this.containerAry[i].length === 0 && (this.crossItems[j][i] === 0 || j === this._difficulty.x - 1)) {
                    var container = cc.instantiate(this.container);
                    container.parent = this.node 
                    var s_container = container.getComponent('Container')
                    s_container.setType(0)
                    s_container.setGridXY(j, i)
                    this.itemAry[i].forEach(element => {
                        s_container.addItem(element)
                    });                    
                    this.containerAry[i].push(container)
                }
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
        this.containerAry = []
        this.itemAry = []
        this.itemSize = this.node.width > this.node.height ? this.node.height : this.node.width
        this.resetBoard()
    },

    start () {

    },

    // update (dt) {},
});
