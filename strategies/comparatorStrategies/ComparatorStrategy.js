/**
 * Created by smk on 05/03/16.
 * Top level strategy, only used to define
 * the functions we need to implement
 */
'use strict';
function ComparatorStrategy (a,b,config){
    this.a = a;
    this.b = b;
    this.config = config;
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