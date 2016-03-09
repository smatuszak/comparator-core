/**
 * Created by smk on 05/03/16.
 * Top level strategy, only used to define
 * the functions we need to implement
 */

function ComparatorStrategy (a,b){
    this.a = a;
    this.b = b;
}

ComparatorStrategy.prototype={
    isApplicable : function(){
        return false;
    },
    execute :function(){
        throw ("NOT IMPLEMENTED - NEVER USE THIS STRATEGY");
    }
};

module.exports = ComparatorStrategy;