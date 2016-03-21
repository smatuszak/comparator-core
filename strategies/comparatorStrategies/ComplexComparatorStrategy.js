/**
 * Created by smatuszak on 11/03/16.
 */
'use strict';
var util = require('util');
var ComparatorStrategy = require('../comparatorStrategies/ComparatorStrategy');


function ComplexComparatorStrategy(a,b, config){
    ComparatorStrategy.call(this,a,b,config);
    this.strategies = [];

}
util.inherits(ComplexComparatorStrategy, ComparatorStrategy);

ComplexComparatorStrategy.prototype={
    isApplicable : function(){
        return (typeof this.a == 'object' && (!this.b || typeof this.b == 'object'))
                || (typeof this.b == 'object' && (!this.a || typeof this.a == 'object'));

    },
    execute : function(){
        var result;
        var JsonComparatorStrategy = require('../comparatorStrategies/JsonComparatorStrategy');
        var ArrayComparatorStrategy = require('../comparatorStrategies/ArrayComparatorStrategy');
        this.strategies.push(new JsonComparatorStrategy(this.a,this.b,this.config));
        this.strategies.push(new ArrayComparatorStrategy(this.a,this.b,this.config));
        for(var i = 0; i<this.strategies.length;i++){
            if((this.strategies[i]).isApplicable()){
                result = (this.strategies[i]).execute();
                break;
            }
        }
        return result;
    }
};

module.exports = ComplexComparatorStrategy;