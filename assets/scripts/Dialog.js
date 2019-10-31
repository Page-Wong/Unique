cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    showView(){
        this.node.active = true;

    },      
    hideView(){        
        this.node.active = false;      
    }
    // update (dt) {},
});
