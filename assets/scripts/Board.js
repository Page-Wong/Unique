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
    initCrossItems(){
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
    initHorizontalContainers(){
        for (let i = 0; i < this._difficulty.y; i++) {
            this.horizontalContainers[i] = []     
            var containerIndex = 0
            for (let j = 0; j < this._difficulty.x; j++) {
                var m_container = this.horizontalContainers[i][containerIndex]
                if (this.crossItems[j][i] === 1) {
                    if (m_container == undefined){
                        m_container = this.createContainer(0)
                        this.horizontalContainers[i][containerIndex] = m_container
                    }                  
                    m_container.getComponent('Container').addItem()
                }
                if(m_container !== undefined && (this.crossItems[j][i] === 0 || j === this._difficulty.x - 1)) {
                    this.addHorizontalContainer(i, m_container)
                    containerIndex += 1
                }
            } 
        }
    },
    initVerticalContainers(){
        for (let i = 0; i < this._difficulty.x; i++) {
            this.verticalContainers[i] = []     
            var containerIndex = 0
            for (let j = 0; j < this._difficulty.y; j++) {
                var m_container = this.verticalContainers[i][containerIndex]
                if (this.crossItems[i][j] === 1) {
                    if (m_container == undefined){
                        m_container = this.createContainer(1)
                        this.verticalContainers[i][containerIndex] = m_container
                    }                  
                    m_container.getComponent('Container').addItem()
                }
                if(m_container !== undefined && (this.crossItems[i][j] === 0 || j === this._difficulty.y - 1)) {
                    this.addVerticalContainer(i, m_container)
                    containerIndex += 1
                }
            } 
        }
    },
    addHorizontalContainer (index, m_container){
        var x = m_container.getComponent('Container').itemCount;
        var y = index * 2 + 1;
        for (let i = 0; i < this.horizontalContainers[index].length - 1; i++) {
            x += this.horizontalContainers[index][i].getComponent('Container').itemCount * 2           
        }
        m_container.parent = this.node.getChildByName('HorizontalView');
        m_container.getComponent('Container').setGridXY(x, y, this.horizontalContainers[index].length - 1);
    },
    addVerticalContainer (index, m_container){
        var x = index * 2 + 1;
        var y = m_container.getComponent('Container').itemCount;
        for (let i = 0; i < this.verticalContainers[index].length - 1; i++) {
            y += this.verticalContainers[index][i].getComponent('Container').itemCount * 2        
        }
        m_container.parent = this.node.getChildByName('VerticalView');
        m_container.getComponent('Container').setGridXY(x, y, this.verticalContainers[index].length - 1);

    },
    createContainer(containerType){
        var m_container = cc.instantiate(this.container);
        m_container.parent = this.node;
        m_container.getComponent('Container').setType(containerType);
        m_container.getComponent('Container').setCellSize(this.cellSize);
        var self = this;
        m_container.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var x = this.node.x;
            var y = this.node.y;
            if (this.containerType === 0) {  
                this.moveX += event.getDeltaX();
                if (this.moveX > this.cellSize) {
                    x += Math.floor(this.moveX / this.cellSize) * this.cellSize;
                    this.moveX = 0;
                } 
                else if (this.moveX < this.cellSize * -1) {
                    x += Math.ceil(this.moveX / this.cellSize) * this.cellSize;
                    this.moveX = 0;
                } 
            }
            else if (this.containerType === 1) {     
                this.moveY += event.getDeltaY();
                if (this.moveY > this.cellSize) {
                    y += Math.floor(this.moveY / this.cellSize) * this.cellSize;
                    this.moveY = 0;
                } 
                else if (this.moveY < this.cellSize * -1) {
                    y += Math.ceil(this.moveY / this.cellSize) * this.cellSize;
                    this.moveY = 0;
                }                 
            }      
            if (x <= self.node.width / 2 - this.cellSize / 2 * this.itemCount && x >= self.node.width / 2 * -1 + this.cellSize / 2 * this.itemCount && !self.checkContainerHit(m_container, x, y)) {                
                this.node.x = x;
            } 
            if (y <= self.node.height / 2 - this.cellSize / 2 * this.itemCount && y >= self.node.height / 2 * -1 + this.cellSize / 2 * this.itemCount && !self.checkContainerHit(m_container, x, y)) {                
                this.node.y = y;
            }   
        }, m_container.getComponent('Container'));
        return m_container;
    },
    checkContainerHit (m_container, x, y) {
        m_container = m_container.getComponent('Container')
        var conteiners = this.horizontalContainers;
        if (m_container.containerType === 1) {
            conteiners = this.verticalContainers;                        
        }
        if (m_container.index - 1 >= 0) {
            var frontContainer = conteiners[m_container.queue][m_container.index - 1];
            frontContainer = frontContainer.getComponent('Container');
            if (m_container.containerType === 0 && x - m_container.itemCount * this.cellSize / 2 < frontContainer.node.x + frontContainer.itemCount * this.cellSize / 2) {
                return true;                       
            }
            if (m_container.containerType === 1 && y - m_container.itemCount * this.cellSize / 2 < frontContainer.node.y + frontContainer.itemCount * this.cellSize / 2) {
                return true;
            }
        }
        if (m_container.index + 1 <= conteiners[m_container.queue].length - 1) {
            var backContainer = conteiners[m_container.queue][m_container.index + 1];    
            backContainer = backContainer.getComponent('Container');
            if (m_container.containerType === 0 && x + m_container.itemCount * this.cellSize / 2 > backContainer.node.x + backContainer.itemCount * this.cellSize / 2 * -1) {
                return true;                       
            }
            if (m_container.containerType === 1 && y + m_container.itemCount * this.cellSize / 2> backContainer.node.y + backContainer.itemCount * this.cellSize / 2 * -1) {
                return true;
            }        
        }
    },
    switchView () {
        if (this.horizontalView.zIndex > this.verticalView.zIndex) {
            this.horizontalView.zIndex = 0;
            this.verticalView.zIndex = 1;
        }
        else {
            this.horizontalView.zIndex = 1;
            this.verticalView.zIndex = 0;
        }
    },
    clearBoard(){
        this.crossItems = []
    },
    resetBoard(){
        this.clearBoard();
        this.initCrossItems();
        this.initHorizontalContainers();
        this.initVerticalContainers();
    },
    onLoad () {        
        this._difficulty = this.difficultyAry[this.difficulty]  
        this.horizontalContainers = []
        this.horizontalItemCounts = [];
        this.verticalContainers = []
        this.horizontalItems = []
        this.verticalItems = []
        this.difficultySetting = this.difficultyAry[this.difficulty]
        this.cellSize = this.node.width > this.node.height ? parseInt(this.node.height / this.difficultySetting.x) : parseInt(this.node.width / this.difficultySetting.y)
        
    },

    start () {
        this.horizontalView = this.node.getChildByName('HorizontalView');
        this.verticalView = this.node.getChildByName('VerticalView');
        this.horizontalView.zIndex = 0;
        this.verticalView.zIndex = 1;
        this.resetBoard();

    },

    // update (dt) {},
});
