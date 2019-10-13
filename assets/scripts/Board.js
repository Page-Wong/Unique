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
    _initHorizontalContainers(crossItems){
        for (let i = 0; i < this._difficulty.y; i++) {
            this.itemAry[i] = []
            this.containerAry[i] = []     
            var containerCount = 0
            for (let j = 0; j < this._difficulty.x; j++) {
                var m_container = this.containerAry[i][containerCount]
                if (this.crossItems[j][i] === 1) {
                    if (m_container == undefined){
                        m_container = cc.instantiate(this.container);
                        m_container.parent = this.node   
                        m_container.getComponent('Container').setType(0)
                        m_container.getComponent('Container').setCellSize(this.itemSize)
                        this.containerAry[i][containerCount] = m_container
                    }                  
                    m_container.getComponent('Container').addItem()
                }
                if(m_container !== undefined && (this.crossItems[j][i] === 0 || j === this._difficulty.x - 1)) {
                    this._addHorizontalContainer(i, m_container)
                    containerCount += 1
                    // var container = cc.instantiate(this.container);
                    // container.parent = this.node 
                    // var s_container = container.getComponent('Container')
                    // s_container.setItemSize(this.itemSize)
                    // s_container.setType(0)
                    // s_container.setGridXY(j, i)
                    // this.itemAry[i].forEach(element => {
                    //     s_container.addItem(element)
                    // });                    
                    // this.containerAry[i].push(container)
                }
            } 
        }
    },
    _addHorizontalContainer (rowNumber, m_container){
        var x = 0;
        var y = rowNumber;
        for (let index = 0; index < this.containerAry[rowNumber].length - 1; index++) {
            x += this.containerAry[rowNumber][index].getComponent('Container').itemCount            
        }
        m_container.parent = this.node;
        m_container.getComponent('Container').setGridXY(x, y);
    },
    _addVerticalContainer (columnNumber){

    },
    _clearBoard(){
        this.crossItems = []
    },
    resetBoard(){
        this._clearBoard()
        this._initCrossItems()
        this._initHorizontalContainers(this.crossItems)
    },
    onLoad () {
        this._difficulty = this.difficultyAry[this.difficulty]  
        this.containerAry = []
        this.itemAry = []
        this.difficultySetting = this.difficultyAry[this.difficulty]
        this.itemSize = this.node.width > this.node.height ? parseInt(this.node.height / this.difficultySetting.y) : parseInt(this.node.width / this.difficultySetting.x)
        this.resetBoard()
    },

    start () {

    },

    // update (dt) {},
});
