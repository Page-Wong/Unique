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
        coinStep:{
            type:cc.Integer,
            default:0,
        },
    }
});

cc.Class({
    extends: cc.Component,

    properties: {        
        difficultyAry:{
            type:[difficultySetting],
            default:[],
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // this.board = this.node.parent.getComponentInChildren('Board');
        // this.m_board = this.board.node.getComponent('Board');
    },
    selectLevelClick(btn, difficulty){
        this.difficulty = difficulty;
        this.difficultySetting = this.difficultyAry[difficulty];   
        this.node.active = false;  
        this.node.parent.getComponent('Main').startGame(this.difficultySetting); 
        // this.m_board.resetBoard(this.difficultySetting);    
    },    
    showView(){
        this.node.active = true;

    },      
    hideView(){        
        this.node.active = false;      
    }
    // update (dt) {},
});
