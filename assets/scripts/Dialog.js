cc.Class({
    extends: cc.Component,

    properties: {   
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.c_main = this.node.parent.getComponent('Main');
        // this.score = this.node.parent.getComponentInChildren('Score');
        // this.m_score = this.score.node.getComponent('Score');
        // this.board = this.node.parent.getComponentInChildren('Board');
        // this.m_board = this.board.node.getComponent('Board');
    },
    coinClick(){
        this.c_main.addMaxStep()
        this.hideView();        
    },
    restartClick(){
        this.hideView();
        this.c_main.showStartView(true);
    },
    shareClick(){
        
    },
    showView(){
        this.node.active = true;

    },      
    hideView(){        
        this.node.active = false;      
    }
    // update (dt) {},
});
