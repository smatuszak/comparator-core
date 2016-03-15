/**
 * Created by smatuszak on 11/03/16.
 */
var util = require('util');
var ComparatorStrategy = require('../comparatorStrategies/ComparatorStrategy');
var ComparatorStrategyRunner = require('../runners/ComparatorStrategyRunner');
var JsonComparatorStrategy = require('../comparatorStrategies/JsonComparatorStrategy');
var ArrayComparatorStrategy = require('../comparatorStrategies/ArrayComparatorStrategy')

function ComplexComparatorStrategy(a,b, config){
    ComparatorStrategy.call(this,a,b,config);
    this.strategies = [];

}
//util.inherits(ComplexComparatorStrategy, ComparatorStrategy);
ComplexComparatorStrategy.prototype = Object.create(ComparatorStrategy.prototype);
ComplexComparatorStrategy.prototype.constructor = ComplexComparatorStrategy;

ComplexComparatorStrategy.prototype={
    isApplicable : function(){
        return (typeof this.a == 'object') && (typeof this.b == 'object');

    },
    execute : function(){
        var result;
        this.strategies.push(Object.create(JsonComparatorStrategy.prototype));
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