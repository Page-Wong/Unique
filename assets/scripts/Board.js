// var difficultySetting=cc.Class({
//     name:'difficultySetting',
//     properties:{
//         x:{
//             type:cc.Integer,
//             default:0,
//         },
//         y:{
//             type:cc.Integer,
//             default:0,
//         },
//         maxStep:{
//             type:cc.Integer,
//             default:0,
//         },
//         coinStep:{
//             type:cc.Integer,
//             default:0,
//         },
//     }
// })

cc.Class({
    extends: cc.Component,

    properties: {
        container:{
            type:cc.Prefab,
            default:null,
        },
        // difficultyAry:{
        //     type:[difficultySetting],
        //     default:[],
        // },
        // difficulty:{
        //     type:cc.Integer,
        //     default:0,
        // },
        score:{
            type: cc.Label,
            default: null
        },
        main:{
            type: cc.Component,
            default: null
        },
        // startView: {
        //     type:cc.Prefab,
        //     default:null,
        // },
        // winView: {
        //     type:cc.Prefab,
        //     default:null,
        // },
        // failView: {
        //     type:cc.Prefab,
        //     default:null,
        // }
    },

    // LIFE-CYCLE CALLBACKS:
    initCrossItems(){
        var tmpAry = []
        for (let i = 0; i < this.difficultySetting.x; i++) {
            tmpAry = []
            for (let j = 0; j < this.difficultySetting.y; j++) {
                var isInit = Math.round(Math.random())
                tmpAry.push(isInit)
            }         
            this.crossItems.push(tmpAry)
        }

    },
    // initTipsView(){
    //     this.c_main.m_tipsView.removeAllChildren();
    //     this.c_main.c_tipsView.setItemSize(this.cellSize);
    //     for (let i = 0; i < this.difficultySetting.x; i++) {
    //         for (let j = 0; j < this.difficultySetting.y; j++) {
    //             if (this.crossItems[i][j] === 1) {                    
    //                 this.c_main.c_tipsView.addItem(i, j);
    //             }
    //         }
    //     }
    // },
    initHorizontalContainers(){
        for (let i = 0; i < this.difficultySetting.y; i++) {
            this.horizontalContainers[i] = []     
            var containerIndex = 0
            for (let j = 0; j < this.difficultySetting.x; j++) {
                var m_container = this.horizontalContainers[i][containerIndex]
                if (this.crossItems[j][i] === 1) {
                    if (m_container == undefined){
                        m_container = this.createContainer(0)
                        this.horizontalContainers[i][containerIndex] = m_container
                    }                  
                    m_container.getComponent('Container').addItem()
                }
                if(m_container !== undefined && (this.crossItems[j][i] === 0 || j === this.difficultySetting.x - 1)) {
                    this.addHorizontalContainer(i, m_container)
                    containerIndex += 1
                }
            } 
        }
    },
    initVerticalContainers(){
        for (let i = 0; i < this.difficultySetting.x; i++) {
            this.verticalContainers[i] = []     
            var containerIndex = 0
            for (let j = 0; j < this.difficultySetting.y; j++) {
                var m_container = this.verticalContainers[i][containerIndex]
                if (this.crossItems[i][j] === 1) {
                    if (m_container == undefined){
                        m_container = this.createContainer(1)
                        this.verticalContainers[i][containerIndex] = m_container
                    }                  
                    m_container.getComponent('Container').addItem()
                }
                if(m_container !== undefined && (this.crossItems[i][j] === 0 || j === this.difficultySetting.y - 1)) {
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
            if (self.isWin) {
                self.showWinView();
                return;
            }
            else if (self.checkIsFail()) {
                self.showFailView();
                return;
            }
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
            if (this.node.x != x &&x <= self.node.width / 2 - this.cellSize / 2 * this.itemCount && x >= self.node.width / 2 * -1 + this.cellSize / 2 * this.itemCount && !self.checkContainerHit(m_container, x, y)) {                
                this.node.x = x;
                self.afterMove();
            } 
            if (this.node.y != y && y <= self.node.height / 2 - this.cellSize / 2 * this.itemCount && y >= self.node.height / 2 * -1 + this.cellSize / 2 * this.itemCount && !self.checkContainerHit(m_container, x, y)) {                
                this.node.y = y;
                self.afterMove();
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
    afterMove(){
        this.c_main.addStep();
        this.isWin = this.checkIsWin();
        this.isFail = !this.isWin && this.checkIsFail();
        if (this.isWin) {
            this.showWinView();
        }
        else if (this.isFail) {
            this.showFailView();
        }
    },
    checkIsWin(){
        for (let i = 0; i < this.difficultySetting.x; i++) {
            this.horizontalItemFlags[i] = [];
            this.verticalItemFlags[i] = [];
            for (let j = 0; j < this.difficultySetting.y; j++) {
                this.horizontalItemFlags[i][j] = 0;
                this.verticalItemFlags[i][j] = 0;
            } 
        }
        this.horizontalContainers.forEach(element => {
            element.forEach(container => {
                container.getComponent('Container').items.forEach(item => {
                    let gridXY = this.convertToGridXY(item);
                    this.horizontalItemFlags[gridXY.x - 1][gridXY.y - 1] = 1;
                }, this);
            }, this);
        }, this);
        this.verticalContainers.forEach(element => {
            element.forEach(container => {
                container.getComponent('Container').items.forEach(item => {
                    let gridXY = this.convertToGridXY(item);
                    this.verticalItemFlags[gridXY.x - 1][gridXY.y - 1] = 1;
                }, this);
            }, this);
        }, this);
        console.log(this.horizontalItemFlags,this.verticalItemFlags);
        let success = this.horizontalItemFlags.every(function(v1, i){
            return v1.every(function(v2, j){
                return this.verticalItemFlags[i][j] === v2
            }, this)
        }, this)
        if (success) {
            return true;
        }
        return false;
    },
    checkIsFail(){
        this.isFail = !this.c_main.checkStep();
        return this.isFail;
    },    
    showWinView(){
        this.c_main.showWinView(true);

    },    
    showFailView(){
        this.c_main.showFailView(true);       
    },   
    convertToGridXY(item){
        let itemWorldPoint = item.convertToWorldSpaceAR(cc.v2(0, 0));
        let boardWorldPoint = this.node.convertToWorldSpaceAR(this.node.getPosition());
        let boardWorldStartPointX = boardWorldPoint.x - this.node.width / 2;
        let boardWorldStartPointY = boardWorldPoint.y - this.node.height / 2;
        let x = Math.ceil((itemWorldPoint.x - boardWorldStartPointX) / this.horizontalGridSize);
        let y = Math.ceil((itemWorldPoint.y - boardWorldStartPointY) / this.verticalGridSize);
        let gridXY = {x: x, y: y}; 
        return gridXY;
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
        this.isWin = false;
        this.isFail = false;
        this.crossItems = [];        
        this.horizontalItemFlags = [];
        this.verticalItemFlags = [];
        this.horizontalContainers = [];
        this.horizontalItemCounts = [];
        this.verticalContainers = [];
        this.horizontalItems = [];
        this.verticalItems = [];
        this.node.getChildByName('HorizontalView').removeAllChildren();
        this.node.getChildByName('VerticalView').removeAllChildren();
    },
    resetBoard(difficultySetting){        
        this.difficultySetting = difficultySetting;  
        // this.m_score = this.score.getComponent('Score');
        this.c_main.maxStep = this.difficultySetting.maxStep;
        this.c_main.coinStep = this.difficultySetting.coinStep;
        this.c_main.updateScore(0);
        this.horizontalGridSize = parseInt(this.node.width / this.difficultySetting.x);
        this.verticalGridSize = parseInt(this.node.height / this.difficultySetting.y);
        this.cellSize = this.node.width > this.node.height ? this.verticalGridSize : this.horizontalGridSize;
        
        this.clearBoard();
        this.initCrossItems();
        // this.initTipsView();
        this.initHorizontalContainers();
        this.initVerticalContainers();
        this.scheduleOnce(function(){
            if (this.checkIsWin()) {
                this.resetBoard(difficultySetting);
            }
        });
    },
    // onLoad () {         
    // },

    start () {
        this.horizontalView = this.node.getChildByName('HorizontalView');
        this.verticalView = this.node.getChildByName('VerticalView');
        this.horizontalView.zIndex = 0;
        this.verticalView.zIndex = 1;
        this.c_main = this.main.getComponent('Main');
        // if (this.m_startView === undefined) {
        //     this.m_startView = cc.instantiate(this.startView);
        //     this.m_startView.parent = this.node.parent;
        //     this.m_startView = this.m_startView.getComponent('Start')
        // }
        // this.m_startView.showView(); 
        // this.resetBoard();

    },

    // update (dt) {},
});
