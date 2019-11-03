// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {   
        board: {
            type: cc.Sprite,
            default: null
        },  
        score: {
            type: cc.Label,
            default: null
        },     
        pauseView: {
            type:cc.Prefab,
            default:null,
        },       
        startView: {
            type:cc.Prefab,
            default:null,
        },
        winView: {
            type:cc.Prefab,
            default:null,
        },
        failView: {
            type:cc.Prefab,
            default:null,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {     
        this.maxStep = 0;
        this.coinStep = 0;
        this.showStartView(true);   
    },
    startGame(difficultySetting){
        this.board.getComponent('Board').resetBoard(difficultySetting);
    },    
    checkStep(){
        return this.step < this.maxStep;
    },
    addStep(){
        this.updateScore(++this.step)
    },
    updateScore(step){
        if (step <= this.maxStep) {
            this.step = step;
            this.score.string = step + '/' + this.maxStep;             
        }
    },
    addMaxStep(){
        this.maxStep = this.maxStep + this.coinStep;
        this.updateScore(this.step);
    },
    showPauseView(){
        if (this.m_pauseView === undefined) {
            this.m_pauseView = cc.instantiate(this.pauseView);
            this.m_pauseView.active = false;
            this.m_pauseView.parent = this.node;
            this.c_pauseView = this.m_startView.getComponent('Pause')
        }
        this.m_pauseView.active = true;
    },
    showStartView(isShow){
        if (this.m_startView === undefined) {
            this.m_startView = cc.instantiate(this.startView);
            this.m_startView.active = false;
            this.m_startView.parent = this.node;
            this.c_startView = this.m_startView.getComponent('Start')
        }
        this.m_startView.active = isShow;
    },
    showWinView(isShow){
        if (this.m_winView === undefined) {
            this.m_winView = cc.instantiate(this.winView);
            this.m_winView.active = false;
            this.m_winView.parent = this.node;
            this.c_winView = this.m_winView.getComponent('Win')
        }
        this.m_winView.active = isShow;
    },
    showFailView(isShow){
        if (this.m_failView === undefined) {
            this.m_failView = cc.instantiate(this.failView);
            this.m_failView.active = false;
            this.m_failView.parent = this.node;
            this.c_failView = this.m_failView.getComponent('Fail')
        }
        this.m_failView.active = isShow;
    },
    // update (dt) {},
});
